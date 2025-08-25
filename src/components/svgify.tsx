"use client";
import ThemeToggle from '../components/themeToggle';
import FileDropZone from "./FileDropZone";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileImage, Eye, Layers, Palette, Code, Copy } from 'lucide-react';

export default function Svgify() {
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    const [ svgContent, setSvgContent ] = useState<string | null>(null);
    const [ name, setName ] = useState<string>("");
    const [ fillColor, setFillColor ] = useState("#000000");
    const [ strokeColor, setStrokeColor ] = useState("#000000");

    const handleFile = (file: File) => {
      if (!file.type.includes("svg")) return;
      const reader = new FileReader();
      reader.onload = (e) => setSvgContent(e.target?.result as string);
      reader.readAsText(file);
      setSelectedFile(file);
    };

    return (
        <>
            <div className="absolute top-0 right-0 p-2">
                <ThemeToggle />
            </div>
        <div className="flex flex-col min-h-screen font-sans bg-white 
            dark:bg-[#2c2d30] pt-12">
            {/* Main content */}
            <div className="flex-grow flex justify-center w-full">
                <div className="flex flex-col xl:w-1/2 w-full xl:p-0 p-5">
                    <h1 className="text-5xl font-bold">Svgify</h1>
                    <p className="pt-3">Upload, customize, and export SVG icons as React/Vue components or CSS backgrounds.</p>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 pt-8">

                        {/* Upload SVG */}
                        <Card className="fly-in-left min-h-95 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center pl-1">
                                    <Upload className="mr-2" strokeWidth={2} size="20" /> 
                                    Upload SVG
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="w-full text-center h-68 rounded-md border-2 border-dashed hover:border-green-500 duration-100 transition-all cursor-pointer flex flex-col justify-center items-center gap-4"
                                >
                                    <FileDropZone onFileSelect={handleFile}>
                                    <FileImage strokeWidth={1.75} size="50" />
                                    <h1 className="font-bold text-md">Drop your SVG file here</h1>
                                    <p className="mb-1">or click to browse</p>
                                    <button className="px-2 py-1 bg-green-400 hover:bg-green-500 duration-100 rounded-full dark:bg-green-700 dark:hover:bg-green-600 text-xs cursor-pointer">
                                        SVG files only
                                    </button>
                                    </FileDropZone>
                                </div>
                                {selectedFile && 
                                    <div className="text-center px-5 py-5 mt-5 
                                        w-full border-2 rounded-lg w-full">
                                        <div className="flex w-full justify-between font-medium">
                                            <h1>{selectedFile.name}</h1>
                                            <button className="px-2 py-1 border-2 duration-100 
                                                rounded-full text-xs font-bold">
                                                Uploaded
                                            </button>
                                        </div>
                                    </div>
                                }
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        <Card className="min-h-95 text-center shadow-md fly-in-top">
                            <CardHeader>
                                <CardTitle className="flex items-center pl-1">
                                    <Eye className="mr-2" strokeWidth={2} size="20" /> 
                                    Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full min-h-68 rounded-md flex flex-col justify-center 
                                    items-center gap-4">
                                    {selectedFile ? (
                                    <div
                                      className="flex h-64 w-64 md:pt-15 items-center justify-center"
                                      dangerouslySetInnerHTML={{
                                        __html: svgContent
                                          ? svgContent
                                              .replace(/fill="[^"]*"/g, `fill="${fillColor}"`)
                                              .replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`)
                                          : "",
                                      }}
                                    />
                                    ) : (
                                      <>
                                        <Layers strokeWidth={1.75} size={50} />
                                        <p className="mb-1">Upload SVG to see preview</p>
                                      </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customisation */}
                        <Card className="min-h-95 shadow-md fly-in-bot">
                            <CardHeader>
                                <CardTitle className="flex items-center pl-1">
                                    <Palette className="mr-2" strokeWidth={2} size="20" /> 
                                    Customisation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center pb-5 md:w-1/2 md:pr-2">
                                    <p>Name</p>
                                    <Input
                                        className="mx-2 focus:outline-green-500 focus-visible:ring-green-500"
                                        maxLength={30}
                                        placeholder={selectedFile?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    {/* Fill Color */}
                                    <div className="flex flex-col">
                                        <p>Fill Colour</p>
                                        <div className="pt-2 flex items-center">
                                          <input
                                            className="w-9 h-9"
                                            type="color"
                                            value={fillColor}
                                            onChange={(e) => setFillColor(e.target.value)}
                                          />
                                          <Input
                                            className="mx-2 focus:outline-green-500 focus-visible:ring-green-500"
                                            onChange={(e) => setFillColor(e.target.value)}
                                            maxLength={7}
                                            pattern="^#([0-9A-Fa-f]{0,6})$"
                                            placeholder="#000000"
                                            value={fillColor}
                                          />
                                        </div>
                                    </div>

                                    {/* Stroke Color */}
                                    <div className="flex flex-col">
                                        <p>Stroke Colour</p>
                                        <div className="pt-2 flex items-center">
                                          <input
                                            className="w-9 h-9"
                                            type="color"
                                            value={strokeColor}
                                            onChange={(e) => setStrokeColor(e.target.value)}
                                          />
                                          <Input
                                            className="mx-2 focus-visible:ring-green-500"
                                            onChange={(e) => setStrokeColor(e.target.value)}
                                            maxLength={7}
                                            pattern="^#([0-9A-Fa-f]{0,6})$"
                                            placeholder="#000000"
                                            value={strokeColor}
                                          />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Generated Code */}
                        <Card className="min-h-95 shadow-md fly-in-right">
                            <CardHeader>
                                <CardTitle className="flex items-center pl-1">
                                    <Code className="mr-2" strokeWidth={2} size="20" /> 
                                    Generated Code
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="mb-3 mr-3 cursor-pointer 
                                    bg-green-400 hover:bg-green-500">
                                    <Copy /> Generate Code
                                </Button>

                                <Button variant="outline" className="mb-3 cursor-pointer hover:bg-gray-200/70">
                                    <Copy /> Copy
                                </Button>
                                <div className="w-full min-h-68 rounded-md flex flex-col justify-center items-center gap-4">
                                    <textarea
                                        className="w-full min-h-68 p-2 focus:ring-2 text-sm font-mono ring-green-500 rounded-md focus:outline-none duration-100 transition"
                                        placeholder="Generated code will appear here..."
                                        readOnly
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto text-right p-2 opacity-50">
                <a href="https://dafbeh.xyz" target="_blank" rel="noreferrer">
                    dafbeh 2025
                </a>
            </footer>
        </div>
        </>
    );
}
