import { TestWindow } from "@stencil/core/testing";
import { MyCatComponent } from "./cat";

describe("cat", () => {
  it("should build", () => {
    expect(new MyCatComponent()).toBeTruthy();
  });

  describe("rendering", () => {
    let element: HTMLMyComponentElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [MyCatComponent],
        html: "<my-cat></my-cat>"
      });
    });

    it("should create the correct tag", async () => {
      expect(element.tagName).toBe("MY-CAT");
    });
  });
});
