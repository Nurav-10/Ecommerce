"use client";
import React, { ChangeEvent, useRef } from "react";
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
import { index } from "drizzle-orm/gel-core";

const categories = ["Electronics", "Clothing", "Home", "Books", "Toys"];

const ProductCreationPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0.0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<string>("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [previewUrls,setPreviewUrls]=useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileRef=useRef<HTMLInputElement>(null)
  const handleFileClick = () => {
    fileInputRef.current?.click();
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
  const handleMultipleFileClick=()=>{
    multipleFileRef.current?.click()
  }

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

  const newPreviewImages=newImages.map((file)=>
  URL.createObjectURL(file))

  setPreviewUrls(newPreviewImages)
  // Upload after selecting
  const formData = new FormData();
  newImages.forEach((file) => formData.append("files", file));

  try {
    const res = await MultipleFiles(formData);

    if (res) {
      setUploadedImages(res);
      toast.success("Images uploaded successfully");
      console.log(res);
    }
  } catch (err) {
    console.error(err);
    toast.error("Image upload failed");
  }
};

  return (
    <div className="p-5 light:bg-zinc-100  h-screen w-full transition-all duration-200 pl-24 md:pl-28 ">
      <h2 className="text-xl light:text-zinc-900 font-semibold">
        Create Products
      </h2>
      <h2 className="text-zinc-600">Add new products to your inventory</h2>
      <Card className="px-3 mt-5">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          <div className="flex flex-col gap-2">
            <CardTitle>Product Title</CardTitle>
            <Input
              placeholder="Enter Title"
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
              type="text"
              name="title"
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>Stock</CardTitle>
            <Input
              placeholder="Enter the no. of products in stock"
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
              type="number"
              name="stock"
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle>Brand Name</CardTitle>
            <Input
              placeholder="Enter Brand"
              className="hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]"
              type="text"
              name="brand"
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle>Price($)</CardTitle>
            <Input
              placeholder="0.00"
              name="price"
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
            <div className="flex gap-1 rounded-sm">
            {
              previewUrls && previewUrls.map((img,ind)=>{
                return(
                  <img key={ind} src={img} className="w-25 h-20 object-cover rounded-sm border" alt='productImage'/>
                )
              })
            }
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
            <CardTitle>Thumbnail Image</CardTitle>
            {preview && (
              <Image
                src={preview}
                width={100}
                height={100}
                alt="previewThumbnail"
                className="w-fit h-fit rounded-sm border border-black"
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
            name="description"
          />
        </div>
      </Card>
      <Button className="bg-blue-400 flex items-center gap-2 hover:bg-blue-500  mt-5 w-fit text-lg rounded-md ">
        Create Product
        <Save size={20} />
      </Button>
    </div>
  );
};

export default ProductCreationPage;
