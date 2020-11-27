<template>
  <div class="home">
    <el-row :gutter="20" type="flex">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        v-for="asset in assets"
        :key="asset.id"
      >
        <router-link
          :to="`/detail/${asset.assetContractAddress}/${asset.tokenId}`"
        >
          <el-card>
            <img :src="asset.imageUrl" class="image" />
            <p class="name">{{ asset.name }}</p>
          </el-card>
        </router-link>
      </el-col>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteHandler"
      ></infinite-loading>
    </el-row>
  </div>
</template>

<script>
import { Row, Col, Card } from "element-ui";
import InfiniteLoading from "vue-infinite-loading";
import getAssets from "@/api/opensea/get-assets";

const mapAsset = asset => ({
  id: asset.id,
  imageUrl: asset.image_thumbnail_url,
  name: asset.name,
  assetContractAddress: asset.asset_contract.address,
  tokenId: asset.token_id
});

export default {
  components: {
    "el-row": Row,
    "el-col": Col,
    "el-card": Card,
    InfiniteLoading
  },
  data() {
    return {
      assets: [],
      offset: 0
    };
  },
  methods: {
    async infiniteHandler($state) {
      try {
        const { data } = await getAssets({ offset: this.offset });
        this.offset += data.assets.length;
        if (data.assets.length > 0) {
          this.assets.push(...data.assets.map(mapAsset));
          $state.loaded();
        }
        if (data.assets.length < 20) {
          $state.complete();
        }
      } catch (error) {
        $state.error();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 40px;
  .el-row {
    flex-wrap: wrap;
  }
  .el-col {
    margin-bottom: 20px;
  }
  .el-card {
    height: 100%;
  }
  .image {
    width: 100%;
  }
  .name {
    text-overflow: ellipsis;
    width: 100%;
    overflow: auto;
  }
  .infinite-loading-container {
    width: 100%;
  }
}
</style>
