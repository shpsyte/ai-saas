"use client";

import { Crisp } from "crisp-sdk-web";
import React, { useEffect } from "react";

function CrispChat() {
  useEffect(() => {
    Crisp.configure("7a4ad6ee-1ef4-42dc-82c7-6d8bbbeb8894");
  }, []);

  return null;
}

export default CrispChat;
