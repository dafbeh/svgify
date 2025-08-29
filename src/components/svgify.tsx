"use client";
import ThemeToggle from '../components/themeToggle';
import FileDropZone from "./FileDropZone";
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileImage, Eye, Layers, Palette, Code, Copy } from 'lucide-react';

export default function Svgify() {
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
    const [ svgContent, setSvgContent ] = useState<string | null>(null);
    const [ name, setName ] = useState<string>("");
    const [ generatedCode, setGeneratedCode ] = useState<string>("");
    const [ size, setSize ] = useState<number>(220);
    const [ debounceSize, setDebounceSize ] = useState<number>(220);
    const [ fillColor, setFillColor ] = useState("#000000");
    const [ strokeColor, setStrokeColor ] = useState("#000000");
    const [ outputMode, setOutputMode ] = useState("react");

    const handleFile = (file: File) => {
        if (!file.type.includes("svg")) return;
        const reader = new FileReader();
        reader.onload = (e) => setSvgContent(e.target?.result as string);
        reader.readAsText(file);
        setSelectedFile(file);
        handleSetName(file.name.replace(/[^A-Za-z]/g, ""));
    };

    const handleSetName = (value: string) => {
        const sanitized = value.replace(/[^A-Za-z]/g, "");
        setName(sanitized);
    };

    const handleCopy = () => {
      if (!generatedCode) return;
      navigator.clipboard.writeText(generatedCode);
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounceSize(size);
      }, 300);

      return () => clearTimeout(timer);
    }, [size]);

    interface GenerateCodeProps {
        svg: string;
        fill: string;
        stroke: string;
    }

    const generateCode = ({ svg }: GenerateCodeProps): string => {
        const jsx = svg
            .replace(/^[\s\S]*?<svg/, '<svg')
            .replace(/<\/svg>[\s\S]*$/, '</svg>')
            .replace(/width="[^"]*"/, `width=${debounceSize}`)
            .replace(/height="[^"]*"/, `height=${debounceSize}`)
            .replace(/fill="[^"]*"/g, `fill="${fillColor}"`)
            .replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`)
            .replace(/\bclass=/g, 'className=');

        if(outputMode=="react"){
        return `import React from "react";

export default function ${name || selectedFile?.name}() {
  return (
    ${jsx}
  );
}`;            
        } else {
            return jsx;
        }
    };

    const handleGenerateCode = () => {
      if (!svgContent) return;
      const code = generateCode({ svg: svgContent, fill: fillColor, stroke: strokeColor });
      setGeneratedCode(code);
    };

    return (
        <>
            <div className="absolute top-0 right-0 p-2">
                <ThemeToggle />
            </div>
        <div className="flex flex-col min-h-screen font-sans bg-white 
            dark:bg-[#2c2d30] md:pt-12 pt-5">
            {/* Main content */}
            <div className="flex-grow flex justify-center w-full">
                <div className="flex flex-col xl:w-1/2 w-full xl:p-0 p-5">
                    <h1 className="text-5xl font-bold">Svgify</h1>
                    <p className="pt-3">Upload, customise, and export SVG icons as React or HTML components.</p>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 pt-8">

                        {/* Upload SVG */}
                        <Card className="min-h-95 shadow-md">
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
                        <Card className="min-h-95 text-center shadow-md">
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
                                            .replace(/width="[^"]*"/, `width="${debounceSize}"`)
                                            .replace(/height="[^"]*"/, `height="${debounceSize}"`)
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
                        <Card className="min-h-95 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center pl-1">
                                    <Palette className="mr-2" strokeWidth={2} size="20" /> 
                                    Customisation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className=" w-full">
                                    <div className="flex w-full justify-between">
                                        <p>Size</p>
                                        <p>{size}x{size} px</p>
                                    </div>
                                    <Slider disabled={!selectedFile} className="py-3 pb-6" defaultValue={[220]} max={260} min={12}
                                        step={1} onValueChange={(val) => setSize(val[0])} />
                                </div>
                                <div className="flex items-center pb-5 md:w-1/2 md:pr-2">
                                    <p>Name</p>
                                    <Input disabled={!selectedFile}
                                        className="mx-2 focus:outline-green-500 focus-visible:ring-green-500"
                                        maxLength={30}
                                        placeholder={name}
                                        onChange={(e) => handleSetName(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    {/* Fill Color */}
                                    <div className="flex flex-col">
                                        <p>Fill Colour</p>
                                        <div className="pt-2 flex items-center">
                                          <input disabled={!selectedFile}
                                            className="w-9 h-9"
                                            type="color"
                                            value={fillColor}
                                            onChange={(e) => setFillColor(e.target.value)}
                                          />
                                          <Input disabled={!selectedFile}
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
                                          <input disabled={!selectedFile}
                                            className="w-9 h-9"
                                            type="color"
                                            value={strokeColor}
                                            onChange={(e) => setStrokeColor(e.target.value)}
                                          />
                                          <Input disabled={!selectedFile}
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
                        <Card className="min-h-95 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center pl-1">
                                    <Code className="mr-2" strokeWidth={2} size="20" /> 
                                    Generated Code
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs value={outputMode} onValueChange={setOutputMode} className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                      <TabsTrigger value="react">React</TabsTrigger>
                                      <TabsTrigger value="html">HTML</TabsTrigger>
                                    </TabsList>
                                <div className="pt-2">
                                    <Button variant="outline" className="mb-3 mr-3 cursor-pointer 
                                        bg-green-400 hover:bg-green-500"
                                        onClick={handleGenerateCode}>
                                        <Copy /> Generate Code
                                    </Button>

                                    <Button variant="outline" className="mb-3 cursor-pointer hover:bg-gray-200/70"
                                    onClick={handleCopy}>
                                        <Copy /> Copy
                                    </Button>
                                </div>
                                <div className="w-full min-h-68 rounded-md flex flex-col justify-center items-center gap-4">
                                    <textarea
                                        className="w-full min-h-68 px-2 pb-5 focus:ring-2 text-sm font-mono ring-green-500 
                                            rounded-md focus:outline-none duration-100 transition"
                                        placeholder="Generated code will appear here..."
                                        value={generatedCode}
                                        readOnly
                                    />
                                </div>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto text-right md:m-4 m-2 opacity-50">
                <a href="https://dafbeh.xyz" target="_blank" rel="noreferrer">
                    dafbeh 2025
                </a>
            </footer>
        </div>
        </>
    );
}