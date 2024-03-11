import { Settings } from "lucide-react";

import { checkSubscription } from "@/lib/subscription";

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";

const SettingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <>
      <div>
        <Heading
          title="Settings"
          description="Manage your account settings and set e-mail preferences."
          icon={Settings}
          iconColor="text-gray-700"
          bgColor="bg-gray-700/10"
        />
        <div className="space-y-4 px-4 lg:px-8">
          <div className="text-sm text-muted-foreground">
            {isPro ? "You are a pro user" : "You are not a pro user"}
          </div>
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </>
  );
};

export default SettingPage;
