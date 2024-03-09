"use client";
// conversation page

import { zodResolver } from "@hookform/resolvers/zod";
import { Code, MessageSquare } from "lucide-react";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as z from "zod";

import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";

import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/Empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";

import { formSchema } from "./constants";

const CodePage = () => {
  const modal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];
      const response = await api.post("/code", {
        messages: newMessages,
      });

      setMessages((c) => [...c, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        modal.onOpen();
      }
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Code generation"
          description="Generate code using descritive text"
          icon={Code}
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
                          placeholder="Simple toggle button using hooks"
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
            {messages.length === 0 && !isLoading && (
              <div>
                <Empty label="No conversation started" />
              </div>
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div
                  key={message.content}
                  className={cn(
                    "flex w-full items-start gap-x-8 rounded-lg p-8",
                    message.role === "user"
                      ? "border border-black/10 bg-white"
                      : "bg-muted",
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="my-2 w-full overflow-auto rounded-lg bg-black/10 p-2">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="rounded-lg bg-black/10 p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="overflow-hidden text-sm leading-7"
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodePage;
