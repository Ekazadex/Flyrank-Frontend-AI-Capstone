"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const settingsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
      },
      {
        message:
          "Password must be at least 8 characters and include one uppercase letter and one number.",
      }
    ),
});

export type SettingsFormValidatedValues = z.infer<typeof settingsSchema>;

export function SettingsFormValidated() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValidatedValues>({
    resolver: zodResolver(settingsSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SettingsFormValidatedValues) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Validated settings saved:", data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      <div aria-live="assertive" className="min-h-[2rem] text-sm text-red-600">
        {errors.fullName?.message || errors.email?.message || errors.password?.message ? (
          <ul role="alert" className="space-y-1">
            {errors.fullName && <li>{errors.fullName.message}</li>}
            {errors.email && <li>{errors.email.message}</li>}
            {errors.password && <li>{errors.password.message}</li>}
          </ul>
        ) : null}
      </div>

      <div>
        <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          placeholder="Jane Doe"
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-2 text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="jane@example.com"
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          placeholder="Optional password"
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
        />
        {errors.password && (
          <p id="password-error" className="mt-2 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
