import { Component, Prop, State } from "@stencil/core";
import moment from "moment";

import { RandomCat } from "model/random-cat";

@Component({
  tag: "my-component",
  styleUrl: "my-component.scss",
  shadow: true
})
export class MyComponent {
  @Prop()
  first: string;
  @Prop()
  last: string;
  @State()
  data: RandomCat;

  componentWillLoad() {
    fetch("https://aws.random.cat/meow")
      .then(res => res.json())
      .then(json => (this.data = json));
  }

  render() {
    const time = moment().format("LLLL");
    return (
      <div>
        <p>
          Hello, World! I'm {this.first} {this.last} and it's {time}
        </p>
        <my-cat cat={this.data} />
      </div>
    );
  }
}
