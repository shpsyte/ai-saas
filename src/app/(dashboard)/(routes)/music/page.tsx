"use client";
// conversation page

import * as zod from "@hookform/resolvers/zod";
import { MessageSquare, Music } from "lucide-react";
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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";

import { formSchema } from "./constants";

const MusicPage = () => {
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zod.zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await api.post("/music", {
        prompt: values.prompt,
      });

      setMusic(response.data.audio);

      form.reset();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Music Generation"
          description="Turn your prompt into an music"
          icon={Music}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-500/10"
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
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="Pianno solo"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              ></FormField>
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
            {!music && !isLoading && (
              <div>
                <Empty label="No music generated" />
              </div>
            )}
            {music && (
              <audio controls className="mt-8 w-full">
                <source src={music} />
              </audio>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
