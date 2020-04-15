import { Component, Prop, State, Watch, h } from '@stencil/core';

@Component({
    tag: 'custom-select',
    styleUrl: 'custom-select.css',
    shadow: true,
})
export class CustomSelect {
    @Prop() selectOptions: any[] | string;
    @Prop() selectName: string;
    @Prop() selectId: string;

    @State() selectedValue: string;

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
    }

    private _selectOptions: any[];

    handleSelect(value) {
        this.selectedValue = value;
    }

    render() {
        return (
            <div>
                <select name={this.selectName} id={this.selectId}>
                    {this._selectOptions.map(option => (
                        <option value={option.value} selected={option.value === this.selectedValue}>{option.value}</option>
                    ))}
                </select>
                <div><h1>{this.selectedValue}</h1></div>
                <div class="slider-wrapper">
                    {this._selectOptions.map(option => (
                        <div class="slide" onClick={() => this.handleSelect(option.value)}>{option.value}</div>
                    ))}
                </div>
            </div>
        );
    }
}
