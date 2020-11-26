<template>
  <div class="detail">
    <header>
      <el-button
        class="back-button"
        icon="el-icon-arrow-left"
        circle
        @click="$router.go(-1)"
      >
      </el-button>
      <h1>{{ collectionName }}</h1>
    </header>
    <img :src="imageUrl" alt="asset-image" />
    <h2>{{ name }}</h2>
    <p class="description">{{ description }}</p>
    <a :href="permalink" target="_blank" class="permalink">
      <el-button>Permalink</el-button>
    </a>
  </div>
</template>

<script>
import getAsset from "@/api/opensea/get-asset";
import { Button, Loading } from "element-ui";

export default {
  components: {
    "el-button": Button
  },
  data() {
    return {
      collectionName: "",
      imageUrl: "",
      name: "",
      description: "",
      permalink: ""
    };
  },
  computed: {
    assetContractAddress() {
      return this.$route.params.assetContractAddress;
    },
    tokenId() {
      return this.$route.params.tokenId;
    }
  },
  async created() {
    let loadingInstance = Loading.service();
    const { data } = await getAsset({
      assetContractAddress: this.assetContractAddress,
      tokenId: this.tokenId
    });
    this.collectionName = data.collection.name;
    this.imageUrl = data.image_url;
    this.name = data.name;
    this.description = data.description;
    this.permalink = data.permalink;
    loadingInstance.close();
  }
};
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0 40px;
  header {
    width: 100%;
    position: relative;
    .back-button {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    h1 {
      width: 80%;
      margin: 2rem auto;
    }
  }
  img {
    width: 100%;
    max-height: 40vh;
    object-fit: contain;
  }
  .description {
    flex: 1;
    overflow: auto;
    text-align: justify;
  }
  .permalink {
    margin: 2rem 0;
    width: 100%;
    .el-button {
      width: 100%;
    }
  }
}
</style>
