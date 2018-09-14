import { Component, Prop } from "@stencil/core";

import { RandomCat } from "model/random-cat";

@Component({
  tag: "my-cat",
  styleUrl: "cat.scss",
  shadow: true
})
export class MyCatComponent {
  @Prop()
  cat: RandomCat;

  render() {
    return <img src={this.cat ? this.cat.file : ""} />;
  }
}
