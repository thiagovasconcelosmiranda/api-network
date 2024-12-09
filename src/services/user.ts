import { never } from "zod";
import { prisma } from "../utils/prisma"
import { getPublicUrl } from "../utils/url";

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
        return {
            ...user,
            avatar: getPublicUrl(user.avatar,'avatars', user.slug),
            cover: getPublicUrl(user.cover,'covers', user.slug),
          }
    }
    return null;
}  

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findMany({
        where: {email}
    });

    if(!user){
       return {
        ...user,
        avatar: getPublicUrl(user.avatar, 'avatars', user.slug ),
        cover: getPublicUrl(user.cover, 'covers', user.slug)
       }
    }
}
 