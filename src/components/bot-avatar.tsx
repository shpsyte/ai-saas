import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <>
      <div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/logo.png" className="p-1" />
        </Avatar>
      </div>
    </>
  );
};
