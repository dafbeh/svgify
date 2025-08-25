"use client";
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileImage, Eye, Layers, Palette, Code, Copy } from 'lucide-react';

export default function Svgify() {
    return (
        <div className="flex justify-center w-full font-sans pb-12">
            <div className="flex flex-col xl:w-1/2 w-full xl:p-0 p-5">
                <h1 className={`text-5xl font-bold`}>Svgify</h1>
                <p className="pt-3">Upload, customize, and export SVG icons as React/Vue components or CSS backgrounds.</p>
                <div className="flex grid md:grid-cols-2 grid-cols-1 gap-8 pt-8">
                    {/* Upload SVG */}
                    <Card className="h-95 text-center">
                        <CardHeader>
                            <CardTitle className="flex items-center pl-1">
                                <Upload className="mr-2" strokeWidth={2} size="20" /> 
                                Upload SVG
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-68 rounded-md border-2 border-dashed 
                                hover:border-green-500 duration-100 transition-all cursor-pointer
                                flex flex-col justify-center items-center gap-4">
                                <FileImage strokeWidth={1.75} size="50" />
                                <h1 className="font-bold text-md">Drop your SVG file here</h1>
                                <p className="mb-1">or click to browse</p>
                                <button className="px-2 py-1 bg-green-400 hover:bg-green-500 duration-100
                                rounded-full dark:bg-green-700 dark:hover:bg-green-600 transition-all
                                    text-xs cursor-pointer"
                                        >SVG files only
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card className="h-95 text-center">
                        <CardHeader>
                            <CardTitle className="flex items-center pl-1">
                                <Eye className="mr-2" strokeWidth={2} size="20" /> 
                                Preview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-68 rounded-md
                                flex flex-col justify-center items-center gap-4">
                                <Layers strokeWidth={1.75} size="50" />
                                <p className="mb-1">Upload SVG to see preview</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customisation */}
                    <Card className="min-h-95">
                        <CardHeader>
                            <CardTitle className="flex items-center pl-1">
                                <Palette className="mr-2" strokeWidth={2} size="20" /> 
                                Customisation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="flex grid grid-cols-2 gap-4 w-full">
                                    <div className="flex flex-col">
                                        <p>Fill Colour</p>
                                        <div className="pt-2 flex items-center">
                                          <input className="w-9 h-9"
                                            type="color"
                                            id="fill"
                                            />
                                            <Input className="mx-2 focus:outline-green-500" defaultValue="#000000" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <p>Stroke Colour</p>
                                        <div className="pt-2 flex items-center">
                                          <input className="w-9 h-9"
                                            type="color"
                                            id="stroke"
                                            />
                                            <Input className="mx-2" defaultValue="#000000" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Generated Code */}
                    <Card className="min-h-95">
                        <CardHeader>
                            <CardTitle className="flex items-center pl-1">
                                <Code className="mr-2" strokeWidth={2} size="20" /> 
                                Generated Code
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="mb-3 cursor-pointer">
                                <Copy /> Copy
                            </Button>
                            <div className="w-full min-h-68 rounded-md
                                flex flex-col justify-center items-center gap-4">
                                <textarea className="w-full min-h-68 p-2 focus:ring-2 text-sm font-mono
                                    ring-green-500 rounded-md focus:outline-none duration-100 transition"
                                    placeholder="Generated code will appear here..."
                                    readOnly
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}