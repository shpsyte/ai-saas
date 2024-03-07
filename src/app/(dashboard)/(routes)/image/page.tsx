"use client";
// conversation page

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/Empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/user-avatar";

import { amountOptions, formSchema, resolutionOptions } from "./constants";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await api.post("/image", values);

      const urls = response.data.map((image: { url: string }) => {
        return image.url;
      });

      setImages(urls);

      form.reset();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Image generation"
          description="Turn your promot int an image"
          icon={ImageIcon}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
        <div className="px-4 lg:px-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <>
                    <FormItem className="col-span-12 lg:col-span-12">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="A picture of a cat"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              ></FormField>
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((option) => {
                            return (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map((option) => {
                            return (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 w-full lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>

          <div className="mt-4 space-y-4">
            {isLoading && (
              <div className="flex w-full items-center justify-center rounded-lg bg-muted p-8">
                <Loader />
              </div>
            )}
            {images.length === 0 && !isLoading && (
              <div>
                <Empty label="No conversation started" />
              </div>
            )}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {images.map((src) => {
                return (
                  <Card key={src} className="overflow-hidden rounded-lg">
                    <div className="relative aspect-square">
                      <Image src={src} className="" alt="Image" fill />
                    </div>
                    <CardFooter className="p-2">
                      <Button
                        className="w-full"
                        variant="ghost"
                        onClick={() => window.open(src, "_blank")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePage;
