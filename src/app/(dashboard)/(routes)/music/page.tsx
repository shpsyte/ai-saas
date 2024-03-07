"use client";
// conversation page

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";

import { formSchema } from "./constants";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";

const ConversationPage = () => {
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
      const response = await api.post("/conversation", {
        messages: newMessages,
      });

      setMessages((c) => [...c, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Conversation"
          description="Out most advance conversation"
          icon={MessageSquare}
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
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="Start a conversation"
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
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationPage;
