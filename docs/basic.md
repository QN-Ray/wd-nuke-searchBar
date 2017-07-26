# SearchBar Demo

- order: 0


旺店搜索框

---

````js

/** @jsx createElement */
import {createElement, Component,render } from 'rax';
import {View,Text, Page} from 'nuke';
import SearchBar from 'wd-nuke-searchBar';

let App = class NukeDemoIndex extends Component {
    constructor() {
        super();
    }
    
    state = {
        value1: '',
        value2: '初始化值'
    }

    render() {
        return (
            <Page title="旺店搜索框">
                <Page.Intro main="基础使用"></Page.Intro>
                <SearchBar
                    onSubmit={(value1)=> {
                        this.setState({value1})
                    }}
                    onClear={()=> {
                        this.setState({value1: ''})
                    }}>
                </SearchBar>
                
                <View style={[styles.lineWithMargin,styles.textLine]}>
                    <Text style={styles.text}>搜索的内容: {this.state.value1}</Text>
                </View>

                <Page.Intro main="有初始值"></Page.Intro>
                <SearchBar 
                    value={this.state.value2}
                    onSubmit={(value2)=> {
                        this.setState({value2})
                    }}
                    onClear={()=> {
                        this.setState({value2: ''})
                    }}>
                </SearchBar>

                <View style={[styles.lineWithMargin,styles.textLine]}>
                    <Text style={styles.text}>搜索的内容: {this.state.value2}</Text>
                </View>
            </Page>
        );
    }
}


const styles={
    lineWithMargin:{
        marginLeft:'30rem',
        marginRight:'30rem',

    },
    textLine:{
        marginTop:'20rem',
        marginBottom:'40rem',
    },
    text:{
        fontSize:'26rem'
    }
}

render(<App/>);


````
