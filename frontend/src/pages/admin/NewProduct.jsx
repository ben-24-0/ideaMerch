import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

import { getCategories, getProductTypes, createProduct } from "../../api/products";
import { uploadImage } from "../../api/upload";

export default function NewProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    material: "",
    price: "",
    stock: "0",
    categoryId: "",
    typeId: "",
    featured: false,
    active: true,
    available: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOptions() {
      try {
        const [categoryData, typeData] = await Promise.all([
          getCategories(),
          getProductTypes(),
        ]);

        setCategories(categoryData);
        setTypes(typeData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingOptions(false);
      }
    }

    loadOptions();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }

  function removeImage() {
    setImage(null);
    setPreview("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!image) {
        throw new Error("Product image is required.");
      }

      // 1. Upload image
      const uploaded = await uploadImage(image);

      // 2. Create product using Cloudinary URL
      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        thumbnail: uploaded.url,
      });

      navigate("/admin/products");
    } catch (err) {
      setError(err.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-black uppercase text-neutral-500">
            Product management
          </p>

          <h1 className="mt-1 font-display text-5xl font-black uppercase tracking-tight">
            Add product.
          </h1>
        </div>

        {error && (
          <div className="mb-6 border-[3px] border-black bg-[var(--red)] p-4 font-black uppercase text-white shadow-[4px_4px_0_#000]">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_320px]"
        >

          {/* Main details */}
          <div className="space-y-6">

            <section className="border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_#000]">
              <h2 className="font-display text-2xl font-black uppercase">
                Product details
              </h2>

              <div className="mt-5 space-y-5">

                <Field
                  label="Product name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="mb-2 block text-xs font-black uppercase">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full resize-none border-[3px] border-black px-4 py-3 font-bold outline-none focus:bg-[var(--yellow)]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <Field
                    label="Material"
                    name="material"
                    value={form.material}
                    onChange={handleChange}
                    placeholder="MDF, Acrylic, Wood..."
                    required
                  />

                  <Field
                    label="Price"
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>
            </section>

            {/* Classification */}
            <section className="border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_#000]">
              <h2 className="font-display text-2xl font-black uppercase">
                Classification
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <SelectField
                  label="Category"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  options={categories}
                  disabled={loadingOptions}
                />

                <SelectField
                  label="Product type"
                  name="typeId"
                  value={form.typeId}
                  onChange={handleChange}
                  options={types}
                  disabled={loadingOptions}
                />

              </div>
            </section>

            {/* Inventory */}
            <section className="border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_#000]">
              <h2 className="font-display text-2xl font-black uppercase">
                Inventory
              </h2>

              <div className="mt-5">
                <Field
                  label="Stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Status */}
            <section className="border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_#000]">
              <h2 className="font-display text-2xl font-black uppercase">
                Status
              </h2>

              <div className="mt-5 space-y-3">

                <Checkbox
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  label="Active"
                  description="Show this product in the store."
                />

                <Checkbox
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  label="Available"
                  description="Allow customers to order this product."
                />

                <Checkbox
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  label="Featured"
                  description="Show this product in the featured section."
                />

              </div>
            </section>

          </div>

          {/* Image */}
          <div>
            <section className="border-[3px] border-black bg-white p-5 shadow-[5px_5px_0_#000] lg:sticky lg:top-5">

              <h2 className="font-display text-2xl font-black uppercase">
                Product image
              </h2>

              <div className="mt-5">

                {preview ? (
                  <div>
                    <div className="aspect-square overflow-hidden border-[3px] border-black bg-neutral-100">
                      <img
                        src={preview}
                        alt="Product preview"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="mt-3 w-full border-[3px] border-black bg-white px-4 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#000]"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center border-[3px] border-dashed border-black bg-neutral-100 text-center hover:bg-[var(--yellow)]">
                    <span className="font-display text-3xl font-black uppercase">
                      + Upload
                    </span>

                    <span className="mt-2 text-xs font-black uppercase text-neutral-500">
                      JPG, PNG or WEBP
                    </span>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-5
                  w-full
                  border-[3px]
                  border-black
                  bg-black
                  px-5
                  py-3
                  font-black
                  uppercase
                  text-white
                  shadow-[4px_4px_0_#000]
                  transition-all
                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0_#000]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Creating..." : "Create product"}
              </button>

            </section>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full border-[3px] border-black px-4 py-3 font-bold outline-none focus:bg-[var(--yellow)]"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  disabled,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        className="w-full border-[3px] border-black bg-white px-4 py-3 font-bold outline-none focus:bg-[var(--yellow)]"
      >
        <option value="">
          {disabled ? "Loading..." : `Select ${label}`}
        </option>

        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({
  name,
  checked,
  onChange,
  label,
  description,
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border-[2px] border-black p-3 hover:bg-neutral-100">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-5 w-5 accent-black"
      />

      <span>
        <span className="block text-sm font-black uppercase">
          {label}
        </span>

        <span className="block text-xs font-bold text-neutral-500">
          {description}
        </span>
      </span>
    </label>
  );
}