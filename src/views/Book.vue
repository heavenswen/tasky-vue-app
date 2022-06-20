<template>
    <h3>epub 阅读器</h3>
    <div id="area" ref="area" ></div>
</template>
<script>
import ePub from 'epubjs';
// import { getCurrentInstance } from 'vue';
export default {
    setup () {
        // const { proxy } = getCurrentInstance();
        function reader () {
            const path = 'https://s3.amazonaws.com/moby-dick/moby-dick.epub'
            const book = ePub(path);
            console.log(book)
            const rendition = book.renderTo('area', { width: 400 });
            rendition.display();
        }
        reader()

        return {};
    }
};
</script>
<style lang="scss" >
 #area {
    border: 1px solid #ccc;
    width: 100%;
    height: 100%;
 }
</style>
