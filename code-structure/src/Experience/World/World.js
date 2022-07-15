import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = experience.scene;
    this.resources = this.experience.resources;
    this.fox = null;
    this.floor = null;
    this.environment = null;

    this.resources.on("ready", () => {
      this.fox = new Fox();
      this.floor = new Floor();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
