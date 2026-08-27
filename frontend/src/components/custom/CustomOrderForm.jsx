import { useState } from "react";
import { openWhatsApp } from "../../utils/whatsapp";

const customTypes = [
  "Custom Keychain",
  "Engraved Portrait",
  "Memento",
  "Figure",
  "Other",
];

const materials = [
  "Not sure yet",
  "Wood",
  "MDF",
  "Acrylic",
  "Plywood",
];

export default function CustomOrderForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    type: "Custom Keychain",
    keychainType: "Lettered / Name",
    quantity: "1",
    material: "Not sure yet",
    details: "",
    budget: "",
    deadline: "",
  });

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.whatsapp.trim() ||
      !form.details.trim()
    ) {
      return;
    }

    const message = `🎨 IDEAMERCH CUSTOM ORDER

CUSTOMER
Name: ${form.name}
Email: ${form.email}
WhatsApp: ${form.whatsapp}

REQUEST
Type: ${form.type}
${
  form.type === "Custom Keychain"
    ? `Keychain Type: ${form.keychainType}`
    : ""
}
Quantity: ${form.quantity}
Material: ${form.material}

DETAILS
${form.details}

${
  form.budget
    ? `Budget: ₹${form.budget}`
    : "Budget: Not specified"
}

${
  form.deadline
    ? `Required By: ${form.deadline}`
    : "Required By: Not specified"
}

Please review this custom request and let me know the next steps.`;

    openWhatsApp(message);
  };

  return (
    <section className="border-t-[3px] border-black bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-neutral-500">
            Got something in mind?
          </p>

          <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
            Make it
            <span className="text-[var(--red)]"> custom.</span>
          </h2>

          <p className="mt-5 max-w-2xl font-bold leading-relaxed text-neutral-600">
            Tell us what you need and we'll get back to you
            with the details.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Type */}
          <FormSection title="What do you need?">

            <SelectField
              label="Custom item"
              value={form.type}
              options={customTypes}
              onChange={(value) =>
                updateField("type", value)
              }
            />

            {form.type === "Custom Keychain" && (
              <SelectField
                label="Keychain type"
                value={form.keychainType}
                options={[
                  "Lettered / Name",
                  "Logo",
                  "Other",
                ]}
                onChange={(value) =>
                  updateField("keychainType", value)
                }
              />
            )}

            <SelectField
              label="Preferred material"
              value={form.material}
              options={materials}
              onChange={(value) =>
                updateField("material", value)
              }
            />

          </FormSection>

          {/* Details */}
          <FormSection title="Order details">

            <div className="grid gap-5 sm:grid-cols-2">

              <InputField
                label="Quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={(value) =>
                  updateField("quantity", value)
                }
              />

              <InputField
                label="Budget (optional)"
                type="number"
                min="0"
                placeholder="₹"
                value={form.budget}
                onChange={(value) =>
                  updateField("budget", value)
                }
              />

            </div>

            <InputField
              label="Required by (optional)"
              type="date"
              value={form.deadline}
              onChange={(value) =>
                updateField("deadline", value)
              }
            />

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-wide">
                Describe your idea *
              </label>

              <textarea
                rows={6}
                value={form.details}
                onChange={(event) =>
                  updateField(
                    "details",
                    event.target.value
                  )
                }
                placeholder="Tell us what you want made, dimensions, text, logo, design idea, quantity details, etc."
                required
                className="
                  w-full
                  resize-y
                  border-[3px]
                  border-black
                  bg-white
                  px-4
                  py-3
                  font-bold
                  outline-none
                  placeholder:text-neutral-400
                  shadow-[4px_4px_0_#000]
                  focus:border-[var(--red)]
                  focus:shadow-none
                "
              />
            </div>

          </FormSection>

          {/* Contact */}
          <FormSection title="Your details">

            <div className="grid gap-5 sm:grid-cols-2">

              <InputField
                label="Name"
                value={form.name}
                placeholder="Your name"
                required
                onChange={(value) =>
                  updateField("name", value)
                }
              />

              <InputField
                label="WhatsApp number"
                type="tel"
                value={form.whatsapp}
                placeholder="Your WhatsApp number"
                required
                onChange={(value) =>
                  updateField("whatsapp", value)
                }
              />

            </div>

            <InputField
              label="Email"
              type="email"
              value={form.email}
              placeholder="you@example.com"
              required
              onChange={(value) =>
                updateField("email", value)
              }
            />

          </FormSection>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-8
              w-full
              border-[3px]
              border-black
              bg-[#25D366]
              px-6
              py-4
              font-display
              text-lg
              font-black
              uppercase
              shadow-[6px_6px_0_#000]
              transition-all
              hover:translate-x-[3px]
              hover:translate-y-[3px]
              hover:shadow-[3px_3px_0_#000]
            "
          >
            Send Custom Request on WhatsApp
          </button>

        </form>
      </div>
    </section>
  );
}


/* -------------------------------- */
/* Reusable form components */
/* -------------------------------- */

function FormSection({ title, children }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 border-b-[3px] border-black pb-2 font-display text-2xl font-black uppercase">
        {title}
      </h3>

      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  min,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wide">
        {label}
        {required && " *"}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        min={min}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          border-[3px]
          border-black
          bg-white
          px-4
          py-3
          font-bold
          outline-none
          placeholder:text-neutral-400
          shadow-[4px_4px_0_#000]
          focus:border-[var(--red)]
          focus:shadow-none
        "
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-wide">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          appearance-none
          border-[3px]
          border-black
          bg-white
          px-4
          py-3
          font-bold
          uppercase
          outline-none
          shadow-[4px_4px_0_#000]
          focus:border-[var(--red)]
          focus:shadow-none
        "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}