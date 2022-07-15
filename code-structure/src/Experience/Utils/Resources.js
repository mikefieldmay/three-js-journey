import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.loaders = null;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    this.sources.forEach((source) => {
      const { path, type } = source;
      if (type === "gltfModel") {
        this.loaders.gltfLoader.load(path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
      if (type === "texture") {
        this.loaders.textureLoader.load(path, (file) => {
          this.sourceLoaded(source, file);
        });
      }

      if (type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    });
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
