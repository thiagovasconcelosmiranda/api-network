import { never } from "zod";
import { prisma } from "../utils/prisma"
import { getPublicUrl } from "../utils/url";
import { Prisma } from "@prisma/client";

export const findUserBySlug = async (slug: string) => {
    const user = await prisma.user.findMany({
        select: {
            avatar: true,
            cover: true,
            slug: true,
            name: true,
            bio: true,
            link: true,
          },
          where: { slug }
    });

    if(user){
        return user;
    }
    return null;
}  

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findMany({
        where: {email}
    });

    if(!user){
       return user;
    }
    return null;
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    const newUser = await prisma.user.create({data});

    return {
        ...newUser,
        avatar: getPublicUrl(newUser.avatar, 'avatars', newUser.slug),
        cover: getPublicUrl(newUser.cover, 'covers', newUser.slug)
      }

}
