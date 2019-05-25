import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import Footer from 'ext/lib/site/footer/component'
import Sidebar from 'ext/lib/site/help/sidebar/component'
import MarkdownGuide from 'lib/site/help/md-guide/component'

export default class Stats extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      countForums: 0,
      countTopics: 0,
      countOpenTopics: 0,
      countClosedTopics: 0,
      countComments: 0,
      countReplies: 0,
      error: '',
    }
  }

  componentDidMount(){
    this.fetchStats()
  }

  fetchStats () {
    fetch('/ext/api/stats/forums', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.ok && res.json())
      .then(stats => {
        this.setState({
          countForums: stats.countForums,
          countTopics: stats.countTopics,
          countOpenTopics: stats.countOpenTopics,
          countClosedTopics: stats.countClosedTopics,
          countComments: stats.countComments,
          countReplies: stats.countReplies,
          isFetching: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({error: 'fetch topics error'})
      })
  }
  render () {
    return (
      <div className="stats">
        <div className="forums-total-container clearfix">
          <div className="data-title text-center">Consultas en total</div>
          <div className="data-value text-center">{this.state.countForums}</div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-4">
          <h4 className="subtitle text-center">Total de ejes</h4>
          <h2 className="text-center text-primary">{this.state.countTopics}</h2>
          </div>
          <div className="col-md-4">
          <h4 className="subtitle text-center">Ejes abiertos</h4>
          <h2 className="text-center text-primary">{this.state.countOpenTopics}</h2>
          </div>
          <div className="col-md-4">
          <h4 className="subtitle text-center">Ejes cerrados</h4>
          <h2 className="text-center text-primary">{this.state.countClosedTopics}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          <h4 className="subtitle text-center">Total comentarios</h4>
          <h2 className="text-center text-primary">{this.state.countComments}</h2>
          </div>
          <div className="col-md-6">
          <h4 className="subtitle text-center">Total respuestas</h4>
          <h2 className="text-center text-primary">{this.state.countReplies}</h2>
          </div>
        </div>
      </div>
    )
  }
}
