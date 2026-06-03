"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  CONTACT_FIELD_LIMITS,
  type ContactFieldErrors,
} from "@/lib/contact/schema";

type ContactApiSuccess = {
  ok: true;
  message: string;
};

type ContactApiError = {
  ok: false;
  error: string;
  fieldErrors?: ContactFieldErrors;
};

type ContactApiResponse = ContactApiSuccess | ContactApiError;

type SubmissionState =
  | {
      kind: "idle";
      message: string | null;
    }
  | {
      kind: "submitting";
      message: string | null;
    }
  | {
      kind: "success";
      message: string;
    }
  | {
      kind: "error";
      message: string;
    };

const INPUT_CLASSNAME =
  "w-full border-b-2 border-[var(--color-border)] py-[var(--space-2)] text-[length:var(--text-body-md)] transition-colors duration-[var(--duration-fast)] focus:border-[var(--color-green)] focus:text-[var(--color-text-primary)] focus:outline-none";

function isNamedField(name: string): name is keyof ContactFieldErrors {
  return name === "name" || name === "email" || name === "message";
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    kind: "idle",
    message: null,
  });
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionState.kind === "submitting") {
      return;
    }

    setSubmissionState({ kind: "submitting", message: null });
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | ContactApiResponse
        | null;

      if (response.ok && result?.ok) {
        formRef.current?.reset();
        setFieldErrors({});
        setSubmissionState({
          kind: "success",
          message: result.message,
        });

        return;
      }

      const errorMessage =
        result && !result.ok
          ? result.error
          : "Your message could not be sent. Please try again.";

      setFieldErrors(result && !result.ok ? (result.fieldErrors ?? {}) : {});
      setSubmissionState({
        kind: "error",
        message: errorMessage,
      });
    } catch {
      setSubmissionState({
        kind: "error",
        message:
          "A network error interrupted the request. Please try again in a moment.",
      });
    }
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name } = event.target;

    if (!isNamedField(name) || !fieldErrors[name]) {
      return;
    }

    setFieldErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  }

  const isSubmitting = submissionState.kind === "submitting";
  const statusTone =
    submissionState.kind === "success"
      ? "text-[var(--color-green)]"
      : "text-[var(--color-amber-dark)]";

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-[var(--space-4)] border border-[var(--color-border)] p-[var(--space-5)]"
      method="post"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col gap-[var(--space-2)]">
        <label
          className="label text-[var(--color-text-secondary)]"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          maxLength={CONTACT_FIELD_LIMITS.name}
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={INPUT_CLASSNAME}
          onChange={handleChange}
        />
        {fieldErrors.name ? (
          <p
            id="name-error"
            className="text-sm text-[var(--color-amber-dark)]"
            role="alert"
          >
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--space-2)]">
        <label
          className="label text-[var(--color-text-secondary)]"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
          maxLength={CONTACT_FIELD_LIMITS.email}
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className={INPUT_CLASSNAME}
          onChange={handleChange}
        />
        {fieldErrors.email ? (
          <p
            id="email-error"
            className="text-sm text-[var(--color-amber-dark)]"
            role="alert"
          >
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--space-2)]">
        <label
          className="label text-[var(--color-text-secondary)]"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Project summary, goals, and constraints"
          required
          maxLength={CONTACT_FIELD_LIMITS.message}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={`${INPUT_CLASSNAME} resize-none`}
          onChange={handleChange}
        />
        {fieldErrors.message ? (
          <p
            id="message-error"
            className="text-sm text-[var(--color-amber-dark)]"
            role="alert"
          >
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {submissionState.message ? (
        <p className={`text-sm ${statusTone}`} role="status" aria-live="polite">
          {submissionState.message}
        </p>
      ) : null}

      <button
        type="submit"
        data-cursor={isSubmitting ? undefined : "cta"}
        disabled={isSubmitting}
        className="label inline-flex w-fit items-center justify-center border border-transparent bg-[var(--color-amber)] px-[var(--space-5)] py-[var(--space-3)] text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-amber-dark)] hover:text-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
