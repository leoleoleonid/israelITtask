import instance from "@/api/instance";

export default async function getList(page = 1) {
    return (await instance.get('/e2', {params: {page}})).data
}