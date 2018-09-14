import { Component } from "@stencil/core";
import "my-component";
import { RandomCat } from "my-component";

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss"
})
export class AppHome {
  public cat: RandomCat;

  render() {
    return (
      <div class="app-home">
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components
          using Stencil! Check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <my-component />
      </div>
    );
  }
}
