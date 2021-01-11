import React, { Component } from 'react';
import Subject from './components/Subject'
import TOC from './components/TOC'
import Control from './components/Control'
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode : 'welcome',
      select_content_id : 1,
      subject : {title : 'WEB', sub : 'World Wide Web!'},
      welcome : {title : 'Welcome', desc:'Hello, React!!'},
      content:[
        {id:1, title:'HTML', desc:'HTML is Hyper Text Markup Language'},
        {id:2, title:'CSS', desc:'Css is for design'},
        {id:3, title:'Javascript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent() {
    var i = 0;
      while(i < this.state.content.length) {
        var data = this.state.content[i]
        if(data.id === this.state.select_content_id){
          return data;
          break;
        }
        i++;
      }
  }
  getContent(){
    console.log('App render');
    var _title, _desc, _article = null;
    //mode === 'welcome'
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } 
    //mode === 'read'
    else if(this.state.mode === 'read') {
      const _content = this.getReadContent();
      const _title = _content.title;
      const _desc = _content.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    //mode === 'create'
    else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id += 1;
        const data = {
          id: this.max_content_id,
          title : _title,
          desc : _desc
        }
        
        const _content = Array.from(this.state.content);
        _content.push(data);
        this.setState({
          content : _content,
          mode : 'read',
          select_content_id : data.id
        })
      }.bind(this)}></CreateContent>   
    }
    //mode === 'update'
    else if(this.state.mode === 'update') {
      const _content = this.getReadContent()
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        debugger;
        //immutable
        let _contents = Array.from(this.state.content);

        let i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id: _id, title: _title, desc: _desc};
            break;
          }
          i++;
        }
        this.setState({
          content : _contents,
          mode : 'read'
        })
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode : 'welcome'
            });
          }.bind(this)}
        >
        </Subject>
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode : 'read',
              select_content_id : Number(id)
            });
          }.bind(this)} 
          data={this.state.content}>
        </TOC>

        <Control
          onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('really?')){
                let _contents = Array.from(this.state.content);
                let i=0;
                while(i < _contents.length){
                  if(_contents[i].id === this.state.select_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                  i++;
                }
                this.setState({
                  mode : 'welcome',
                  content : _contents
                })
                alert('delete');
              }
            } else {
              this.setState({
                mode : _mode
              })
            }
          }.bind(this)}
        >
        </Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
