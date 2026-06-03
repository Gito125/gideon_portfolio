export const CONTACT_FIELD_LIMITS = {
  name: 80,
  email: 160,
  message: 4000,
} as const;

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

type ContactParseSuccess = {
  success: true;
  data: ContactFormData;
};

type ContactParseFailure = {
  success: false;
  error: string;
  fieldErrors: ContactFieldErrors;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeFieldValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactPayload(
  payload: unknown,
): ContactParseSuccess | ContactParseFailure {
  if (!payload || typeof payload !== "object") {
    return {
      success: false,
      error: "Please submit the contact form again.",
      fieldErrors: {},
    };
  }

  const rawPayload = payload as Record<string, unknown>;

  const data: ContactFormData = {
    name: normalizeFieldValue(rawPayload.name),
    email: normalizeFieldValue(rawPayload.email).toLowerCase(),
    message: normalizeFieldValue(rawPayload.message),
  };

  const fieldErrors: ContactFieldErrors = {};

  if (!data.name) {
    fieldErrors.name = "Please enter your name.";
  } else if (data.name.length > CONTACT_FIELD_LIMITS.name) {
    fieldErrors.name = `Name must be ${CONTACT_FIELD_LIMITS.name} characters or fewer.`;
  }

  if (!data.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (data.email.length > CONTACT_FIELD_LIMITS.email) {
    fieldErrors.email = `Email must be ${CONTACT_FIELD_LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(data.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!data.message) {
    fieldErrors.message = "Please enter a message.";
  } else if (data.message.length > CONTACT_FIELD_LIMITS.message) {
    fieldErrors.message =
      `Message must be ${CONTACT_FIELD_LIMITS.message} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  return {
    success: true,
    data,
  };
}
