import { auth } from "@clerk/nextjs";

import { MAX_FREE_COUNT } from "@/constants";

import prismadb from "./prismadb";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const currentuser = userId;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: currentuser,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId: currentuser,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId: currentuser,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
    return true;
  }

  return false;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
