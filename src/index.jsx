'use strict';

import { createElement, Component } from 'rax';
import { View, Text, Icon, Input, Touchable } from 'nuke';
import styles from './style';


class CloseIcon extends Component {

    state = {
        bShow: false
    }

    show() {
        this.setState({
            bShow: true
        });
    }

    hide() {
        this.setState({
            bShow: false
        })
    }

    render() {
        return <Icon name="deleteFilling" style={[styles.searchCloseIcon, this.state.bShow?{opacity:1}:{opacity:0}]} />
    }
}

class WDSearchBar extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        clear: false,
        value: null
    }


    componentWillMount() {
        this.state.value = this.props.value || null;
        this.state.showMask = this.props.showMask;
        this.state.clear = this.props.value ? true : false;
    }

    componentDidMount() {
        if(this.state.clear) {
            this.refs.closeIcon.show();
        }
    }

    onSubmit() {
        if (this.props.onSubmit) {
            let value = this.state.value || '';
            this.props.onSubmit((value.trim && value.trim()) || '');
        }
        this.refs.myInput && this.refs.myInput.blur && this.refs.myInput.blur();
    }

    onChange(e) {
        if(e.value) {
            this.state.value = e.value;

            if(this.state.clear === false) {
                this.state.clear = true;
                this.refs.closeIcon.show();
            }

        }else {
            this.state.value = e.value;
            this.state.clear = false;
            this.refs.closeIcon.hide();
        }

        if (this.props.onChange) {
            this.props.onChange(e.value);
        }
    }

    onFocus(e) {
        this.props.onFocus && this.props.onFocus(e.value);
    }

    onBlur(e) {
        this.state.showMask && this.refs.modal.hide();
        this.props.onBlur && this.props.onBlur(e.value);
    }

    onClear() {
        this.setState({
            value: ' '
        }, ()=> {
            this.setState({
                value: ''
            }, ()=> {
                this.state.value = '';
                this.state.clear = false;
                this.refs.closeIcon.hide();
            });
        });

        this.refs.myInput && this.refs.myInput.blur && this.refs.myInput.blur();
        

        if (this.props.onClear) {
            this.props.onClear('');
        }
        if (this.props.onChange) {
            this.props.onChange('');
        }
    }

    render() {
        const {value} = this.state;
        const {placeholder = '输入关键字', editable = true, style} = this.props;
        return (
            <View style={[styles.wrapper, style]}>
                <Input
                    type="text"
                    disabled={!editable}
                    placeholder={placeholder}
                    value={value}
                    onInput={this.onChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    style={styles.input}
                    returnKeyType="search"
                    onReturn={()=> { this.onSubmit() }}
                    ref="myInput"
                    />
                <View style={styles.search}>
                    <Icon name="search" style={styles.searchIcon} />
                </View>
                <Touchable style={styles.searchClose} onPress={()=> this.onClear()}>
                    <CloseIcon ref="closeIcon"/>
                </Touchable>
                <Touchable style={styles.searchTextContainer} onPress={()=> { this.onSubmit() } }>
                    <Text style={styles.searchText}>搜索</Text>
                </Touchable>
            </View>
        );
    }
}
export default WDSearchBar;
