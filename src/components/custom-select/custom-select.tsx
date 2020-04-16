import { Component, Prop, State, Watch, Listen, h } from '@stencil/core';

@Component({
    tag: 'custom-select',
    styleUrl: 'custom-select.css',
    shadow: true,
})
export class CustomSelect {
    @Prop() selectOptions: any[] | string;
    @Prop() selectName: string = 'swipe';
    @Prop() selectId: string;
    @Prop() itemWidth: number = 70;
    @Prop() itemHeight: number = 40;
    @Prop() itemsToShow: number = 5;
    @Prop() selectCurrency: string = '€';
    @Prop() selectPeriod: string = 'month';
    @Prop() selectedMarkerText: string;
    @Prop() mainColor: string = '#005e51';

    @State() selectedValue: string;
    @State() selectedIndex: number;
    @State() swipe: any = {
        active: false,
        startPos: 0,
        scrollLeft: 0,
    };
    @State() middleIndex: number = Math.trunc(this.itemsToShow / 2);

    moveElement: HTMLElement;

    @Watch('selectOptions')selectOptionsWatcher(newValue: any[] | string) {
        if (typeof newValue === 'string') {
            this._selectOptions = JSON.parse(newValue);
        }
        else {
            this._selectOptions = newValue;
        }
    }

    componentWillLoad() {
        this.selectOptionsWatcher(this.selectOptions);
        this.setSelected();
    }

    private _selectOptions: any[];
    private markSelected(value, index): boolean {
        return this.selectedValue ? value === this.selectedValue : index === this.middleIndex;
    };

    setSelected() {
        this.selectedValue = this._selectOptions[this.middleIndex].value;
        this.selectedIndex = this.middleIndex;
    }

    centeringElement(index) {
        const middleElementIndex = Math.trunc(this.itemsToShow / 2);
        const middleMargin = middleElementIndex * this.itemWidth;
        this.moveElement.style.marginLeft = index > middleElementIndex - 1
            ? `-${(index - middleElementIndex) * this.itemWidth}px`
            : `${middleMargin}px`;
    }

    handleMouseDown(event) {
        const rootElement = this.moveElement;
        this.swipe.active = true;
        const presetMargin = rootElement.style.marginLeft ? parseInt(rootElement.style.marginLeft.slice(0, -2)) : 0;
        this.swipe.startPos = event.pageX;
        this.swipe.scrollLeft = presetMargin;
    }
    handleDrag(event) {
        if (this.swipe.active) {
            const rootElement = this.moveElement;
            const scrollValue = event.pageX - this.swipe.startPos;
            const modulo = (scrollValue % this.itemWidth) > 0 ? this.itemWidth : 0;
            const moveValue = (Math.trunc(scrollValue / this.itemWidth)) * this.itemWidth + modulo;
            rootElement.style.marginLeft = `${this.swipe.scrollLeft + moveValue}px`;
        }
    }
    handleClick(value, index) {
        this.selectedValue = value;
        this.selectedIndex = index;
        this.centeringElement(index);
    }

    @Listen("keydown")
    handleKeyDown(ev: KeyboardEvent) {
        if (ev.key === "ArrowLeft") {
            if (this.selectedIndex > 0) {
                this.selectedIndex -= 1;
                this.selectedValue = this._selectOptions[this.selectedIndex].value;
                this.centeringElement(this.selectedIndex);
            }
        } else if (ev.key === "ArrowRight") {
            if (this.selectedIndex < this._selectOptions.length - 1) {
                this.selectedIndex += 1;
                this.selectedValue = this._selectOptions[this.selectedIndex].value;
                this.centeringElement(this.selectedIndex);
            }
        }
    }

    @Listen("mouseup", { target: 'window' })
    handleMouseUp() {this.swipe.active = false}

    render() {
        return (
            <div>
                {/* select component needed here just to submit for with default action */}
                <select class="hidden-select" name={this.selectName} id={this.selectId}>
                    {this._selectOptions.map((option, index) => (
                        <option value={option.value} selected={this.markSelected(option.value, index)}>{option.value}</option>
                    ))}
                </select>
                <div class="visible-area" style={{'width': `${this.itemWidth * this.itemsToShow}px`}}>
                    <div
                        class="slider-wrapper"
                        tabindex="0"
                        ref={(el) => this.moveElement = el as HTMLElement}
                    >
                        {this._selectOptions.map((option, index) => {
                            const isActiveOption = this.markSelected(option.value, index);
                            const itemFontSize = isActiveOption ? this.itemHeight * 0.8 : this.itemHeight * 0.6;
                            const itemColor = isActiveOption && this.mainColor ? this.mainColor : '#000';
                            return (
                                <div
                                    class="slide"
                                    style={{
                                    'width': `${this.itemWidth}px`,
                                    'height': `${this.itemHeight}px`,
                                }}
                                    onMouseDown={event => this.handleMouseDown(event)}
                                    onMouseMove={event => this.handleDrag(event)}
                                    onClick={() => this.handleClick(option.value, index)}
                                >
                                    {this.selectedMarkerText && isActiveOption &&
                                    <p
                                        class="slide-marker"
                                        style={{'color': `${itemColor}`}}
                                    >{this.selectedMarkerText}</p>}
                                    <p
                                        style={{
                                        'color': `${itemColor}`,
                                        'font-size': `${itemFontSize}px`
                                    }}
                                    >{option.value}</p>
                                    {isActiveOption && <p class="slide-bottom-text">{this.selectCurrency}/{this.selectPeriod}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
