import { Pathfinder } from "../pathfinder/Pathfinder";
import { List } from "../utils/List";
import { Builder } from "../builder/Builder";

export class ControlBar {
  private builderSelect: HTMLSelectElement;
  private generateButton: HTMLAnchorElement;
  private pathfinderSelect: HTMLSelectElement;
  private findButton: HTMLAnchorElement;
  private resetButton: HTMLAnchorElement;

  private builders: List<Builder>;
  private pathfinders: List<Pathfinder>;

  public onbuilderchange: ((builder: Builder) => any) | null;
  public ongenerate: (() => any) | null;
  public onpathfinderchange: ((pathfinder: Pathfinder) => any) | null;
  public onfind: (() => any) | null;
  public onreset: (() => any) | null;

  constructor(
    builderSelect: HTMLSelectElement,
    generateButton: HTMLAnchorElement,
    pathfinderSelect: HTMLSelectElement,
    findButton: HTMLAnchorElement,
    resetButton: HTMLAnchorElement
  ) {
    this.builderSelect = builderSelect;
    this.generateButton = generateButton;
    this.pathfinderSelect = pathfinderSelect;
    this.findButton = findButton;
    this.resetButton = resetButton;

    this.builders = new List<Builder>();
    this.pathfinders = new List<Pathfinder>();

    this.onbuilderchange = null;
    this.ongenerate = null;
    this.onpathfinderchange = null;
    this.onfind = null;
    this.onreset = null;

    this.setupEvents();
  }

  private setupEvents(): void {
    this.builderSelect.onclick = () => {
      this.handleOnBuilderChangeEvent();
    };
    this.generateButton.onclick = () => {
      this.handleOnGenerateButtonClickEvent();
    };
    this.pathfinderSelect.onclick = () => {
      this.handleOnPathfinderChangeEvent();
    };
    this.findButton.onclick = () => {
      this.handleOnFindButtonClickEvent();
    };
    this.resetButton.onclick = () => {
      this.handleOnResetButtonClickEvent();
    };
  }

  public addBuilder(builderName: string, builder: Builder): void {
    const newOption: HTMLOptionElement = document.createElement('option');
    newOption.text = builderName;
    newOption.value = '' + this.builders.size();
    this.builders.add(builder);
    this.builderSelect.add(newOption);
  }

  public getDefaultBuilder(): Builder | null {
    return this.builders.get(0);
  }

  public addPathfinder(pathfinderName: string, pathfinder: Pathfinder): void {
    const newOption: HTMLOptionElement = document.createElement('option');
    newOption.text = pathfinderName;
    newOption.value = '' + this.pathfinders.size();
    this.pathfinders.add(pathfinder);
    this.pathfinderSelect.add(newOption);
  }

  public getDefaultPathfinder(): Pathfinder | null {
    return this.pathfinders.get(0);
  }

  private handleOnBuilderChangeEvent(): void {
    this.triggerOnBuilderChangeEvent();
  }

  private handleOnGenerateButtonClickEvent(): void {
    this.triggerOnGenerateEvent();
  }

  private handleOnPathfinderChangeEvent(): void {
    this.triggerOnPathfinderChangeEvent();
  }

  private handleOnFindButtonClickEvent(): void {
    this.triggerOnFindEvent();
  }

  private handleOnResetButtonClickEvent(): void {
    this.triggerOnResetEvent();
  }

  private triggerOnBuilderChangeEvent(): void {
    if (this.onbuilderchange == null) return;
    const index: number = parseInt(this.builderSelect.value);
    const builder: Builder | null = this.builders.get(index);
    if (builder != null) this.onbuilderchange(builder);
  }

  private triggerOnGenerateEvent(): void {
    if (this.ongenerate == null) return;
    this.ongenerate();
  }

  private triggerOnPathfinderChangeEvent(): void {
    console.log("Pathfinder change");
    if (this.onpathfinderchange == null) return;
    const index: number = parseInt(this.pathfinderSelect.value);
    const pathfinder: Pathfinder | null = this.pathfinders.get(index);
    if (pathfinder != null) this.onpathfinderchange(pathfinder);
  }

  private triggerOnFindEvent(): void {
    if (this.onfind == null) return;
    this.onfind();
  }

  private triggerOnResetEvent(): void {
    if (this.onreset == null) return;
    this.onreset();
  }
}