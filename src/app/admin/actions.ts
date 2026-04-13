"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function acceptApplication(id: string) {
  try {
    await prisma.factionApplication.update({
      where: { id },
      data: { status: "accepted" },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Could not update status" };
  }
}

export async function rejectApplication(id: string) {
  try {
    await prisma.factionApplication.update({
      where: { id },
      data: { status: "rejected" },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Could not update status" };
  }
}
