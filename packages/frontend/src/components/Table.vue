<template>
    <div class="conatiner">
        <h2>List length: {{ list.length }}</h2>
        <ul class="list">
            <li
                    v-for="(item, index) in list"
                    :key="index"
            >
                {{ `${index + 1}. ${item}` }}
            </li>
        </ul>
        <button
                type="button"
                @click="getPrev()"
        >
            Prev. Page
        </button>

        <button
                type="button"
                @click="getNext()"
        >
            Next Page
        </button>
        <p>Страница: {{ currentPage }} из {{ totalPages }}</p>
    </div>
</template>

<script>
import getList from "@/api/list";

export default {
    name: 'UserCard',
    data() {
        return {
            list: [],
            totalListLength: 0,
            totalPages: 1,
            currentPage: 1
        }
    },
    mounted() {
        this.getList(1)
    },
    methods: {
        async getList(page) {
            //TODO errors handling
            const {list, totalPages} = await getList(page);
            this.list = list;
            this.totalPages = totalPages;
        },
        async getNext() {
            const nextPage  = this.currentPage + 1;
            if (nextPage > this.totalPages) return;
            //TODO errors handling
            await this.getList(nextPage);
            this.currentPage = nextPage;
        },
        async getPrev() {
            const nextPage  = this.currentPage - 1;
            if (nextPage < 1) return;
            //TODO errors handling
            await this.getList(nextPage);
            this.currentPage = nextPage;
        }
    }
}
</script>

<style lang="scss" scoped>
.user-card {
  margin-top: 40px;
}
.info {
  margin-left: 50px;
}
h2 {
  margin-bottom: 14px;
}
</style>