"use client";
import React, { useRef, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Save, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/customised-components/button";
import SingleFile from "@/actions/singleFile";
import MultipleFiles from "@/actions/multipleFiles";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckAuth } from "@/actions/checkAuth";
import { color } from "motion";
const categories = [
  "Electronics",
  "Clothing",
  "Home",
  "Books",
  "Toys",
  "Furniture",
];

const subCat = ["Men","Women",'Kid'];

const ProductCreationPage = () => {
  const router = useRouter();
  const [colors, setColors] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileRef = useRef<HTMLInputElement>(null);
  const [userDetails, setUserDetails] = useState<null | any>(null);
  const [newColor, setNewColor] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [choice, setChoice] = useState("Color");
  useEffect(() => {
    (async () => {
      const info = await CheckAuth();
      if (info) {
        if (info.payload.role !== "SELLER") router.back();
        setUserDetails(info.payload);
      }
    })();
  }, []);
  const uploadProduct = async () => {
    console.log('clicked')
    if (
      !userDetails.id ||
      !title ||
      !brand ||
      !stock ||
      !price ||
      !uploadedImages ||
      !thumbnailImage ||
      !description ||
      !category
    ) {
      toast.error("Please fill all the fields of the products");
      return;
    }
    const data = {
      title: title.trim(),
      brand: brand.trim(),
      stock: stock,
      price: price,
      images: uploadedImages,
      thumbnail: thumbnailImage.trim(),
      description: description.trim(),
      subcategory,
      colors,
      category: category.trim(),
      user_id: userDetails?.id,
      
    };
    try {
      const response = await fetch("/api/admin/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(data)
      });
      const res = await response.json();
      if(res.success){
      toast.success("Product Created Successfully");
      console.log(res.data);
      }
      else{
        toast.error('Failed To Upload Product')
      }
    } catch (error: any) {
      toast.error(error.message);
      return;
    } finally {
      setTitle("");
      setPrice(0);
      setBrand("");
      setImages([]);
      setDescription("");
      setStock(0);
      setCategory("");
      setThumbnailImage("");
      setPreview("");
      setSubCategory('')
      setUploadedImages([]);
    }
  };
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleColors = (newC: string) => {
    let makeColor = newC.toString();
    if (choice === "Hex") makeColor = `#${newC}`;

    if (newC.length < 2) {
      toast.error("Please enter the correct color code");
      return;
    }
    setColors((prev: string[]) =>
      prev.includes(makeColor) ? prev : [...prev, makeColor]
    );
    setNewColor("");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      const formdata = new FormData();
      formdata.append("file", file);
      const result = await SingleFile(formdata);
      if (result) {
        console.log(result);
        setPreview(url);
        setThumbnailImage(result);
      }
    }
  };

  const handleMultipleFileClick = () => {
    multipleFileRef.current?.click();
  };

  const handleMultipleImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);

    if (images.length + selectedFiles.length > 3) {
      toast.error("Not more than 3 images can be uploaded");
      return;
    }

    const newImages = [...images, ...selectedFiles];
    setImages(newImages);

    const newPreviewImages = newImages.map((file) => URL.createObjectURL(file));

    setPreviewUrls(newPreviewImages);
    // Upload after selecting
    const formData = new FormData();
    newImages.forEach((file) => formData.append("files", file));

    try {
      const res = await MultipleFiles(formData);

      if (res) {
        setUploadedImages(res);
        console.log(res);
        toast.success("Images uploaded successfully");
        return;
      }
    } catch (err: any) {
      toast.error("Image upload failed", err);
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 light:bg-zinc-100 h-full w-full transition-all duration-200 pl-24 md:pl-28">
      <div className="text-xl light:text-zinc-900 font-semibold flex justify-between items-center">
        <h2>Create Products</h2>
        <h2 className="px-3 py-1 text-lg  bg-blue-400/40 rounded-2xl shadow-lg shadow-blue-500/25">
          Admin Panel
        </h2>
      </div>
      <h2 className="text-zinc-600">Add new products to your inventory</h2>
      <Card className="px-3 mt-5 h-fit">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          <div className="flex flex-col gap-2">
            <CardTitle>Product Title</CardTitle>
            <Input
              placeholder="Enter Title"
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>Stock</CardTitle>
            <Input
              placeholder="Enter the no. of products in stock"
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
              type="number"
              onChange={(e) => setStock(parseInt(e.target.value))}
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>Brand Name</CardTitle>
            <Input
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter Brand"
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
              type="text"
              value={brand}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle>Price($)</CardTitle>
            <Input
              placeholder="Enter price"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type="number"
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle>Category</CardTitle>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)] focus:ring-amber-100 px-2 py-1 border rounded-md"
            >
              <option className="text-zinc-800" value={""}>
                Select Category
              </option>
              {categories.map((cat) => (
                <option
                  className="bg-slate-50 border text-black hover:bg-amber-100"
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>Product Images</CardTitle>
            <div className="flex gap-2 rounded-sm">
              {previewUrls &&
                previewUrls.map((img, ind) => {
                  return (
                    <img
                      key={ind}
                      src={img}
                      className="md:w-25 md:h-30 w-20 h-20 object-cover rounded-sm border"
                      alt="productImage"
                    />
                  );
                })}
            </div>
            <div
              className="flex flex-col items-center text-gray-500 border rounded-md cursor-pointer border-dashed p-5 hover:text-blue-500"
              onClick={handleMultipleFileClick}
            >
              <Upload size={30} />
              <p>Click to upload</p>
              <p className="text-xs">PNG or JPG (Max. 2MB)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={multipleFileRef}
              className="hidden"
              onChange={handleMultipleImage}
            />
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>SubCategory</CardTitle>
            <select
              value={subcategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)] focus:ring-amber-100 px-2 py-1 border rounded-md"
            >
              <option className="text-zinc-800" value={""}>
                Select Category
              </option>
              {subCat.map((cat) => (
                <option
                  className="bg-slate-50 border text-black hover:bg-amber-100"
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Colors</h2>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="border w-fit h-fit px-3 rounded-md hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
                placeholder="Input hex"
              />

              <button
                onClick={() => setChoice("Hex")}
                className={`px-2 border rounded-md ${
                  choice === "Hex" && "bg-pink-300"
                }  hover:shadow-[1px_1px_2px_rgba(0,0,0,1)]`}
              >
                Hex
              </button>

              <button
                onClick={() => setChoice("Color")}
                className={`${
                  choice === "Color" && "bg-blue-300"
                } px-2   rounded-md border hover:shadow-[1px_1px_2px_rgba(0,0,0,1)] `}
              >
                Color
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className=" h-fit w-fit px-2 py-1 bg-zinc-800 font-semibold text-white rounded-md"
                type="submit"
                onClick={() => handleColors(newColor)}
              >
                Submit
              </button>
              {colors.length > 0 &&
                colors.map((i, ind) => {
                  return (
                    <div
                      style={{ backgroundColor: i }}
                      key={ind}
                      className={`w-5 h-5 border rounded-full`}
                    ></div>
                  );
                })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>Thumbnail Image</CardTitle>
            {preview && (
              <Image
                src={preview}
                width={100}
                height={100}
                alt="previewThumbnail"
                className="w-fit h-70 rounded-sm border border-black"
              />
            )}
            <div
              className="flex flex-col items-center text-gray-500 border rounded-md cursor-pointer border-dashed p-5 hover:text-blue-500"
              onClick={handleFileClick}
            >
              <Upload size={30} />
              <p>Click to upload</p>
              <p className="text-xs">PNG or JPG (Max. 2MB)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle>Add Description</CardTitle>
          <Textarea
            placeholder="Enter Title"
            className=" hover:shadow-[2px_2px_3px_rgba(0,0,0,1)] h-fit"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Card>
      <button
        className="bg-blue-500/20 flex px-3 py-1 border hover:shadow-[2px_2px_1px_rgba(0,0,0,1)] items-center gap-2 transition-all ease-in w-fit mt-2  text-lg rounded-md "
        type="button"
        onClick={uploadProduct}
      >
        Create Product
        <Save size={20} />
      </button>
    </div>
  );
};

export default ProductCreationPage;
