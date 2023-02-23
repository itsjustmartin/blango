// hardcoding for now without fetching from API in js
class PostRow extends React.Component {
  render () {
    const post = this.props.post

    let thumbnail

    if (post.hero_image.thumbnail) {
      thumbnail = <img src={post.hero_image.thumbnail}/>
    } else {
      thumbnail = '-'
    }

    return <tr>
      <td>{post.title}</td>
      <td>
        {thumbnail}
      </td>
      <td>{post.tags.join(', ')}</td>
      <td>{post.slug}</td>
      <td>{post.summary}</td>
      <td><a href={'/post/' + post.slug + '/'}>View</a></td>
    </tr>
  }
}

class PostTable extends React.Component {
  state = {
    dataLoaded: false,
    data: null
  }

  componentDidMount () {
    fetch(this.props.url).then(response => {
      if (response.status !== 200) {
        throw new Error('Invalid status from server: ' + response.statusText)
      }

      return response.json()
    }).then(data => {
      this.setState({
        dataLoaded: true,
        data: data
      })
    }).catch(e => {
      console.error(e)
      this.setState({
        dataLoaded: true,
        data: {
          results: []
        }
      })
    })
  }

  render () {
    let rows
    if (this.state.dataLoaded) {
      if (this.state.data.results.length) {
        rows = this.state.data.results.map(post => <PostRow post={post} key={post.id}/>)
      } else {
        rows = <tr>
          <td colSpan="6">No results found.</td>
        </tr>
      }
    } else {
      rows = <tr>
        <td colSpan="6">Loading&hellip;</td>
      </tr>
    }

    return <table className="table table-striped table-bordered mt-2" style={{ color: 'white' }}>
      <thead>
      <tr >
        <th>Title</th>
        <th>Image</th>
        <th>Tags</th>
        <th>Slug</th>
        <th>Summary</th>
        <th>Link</th>
      </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  }
}

const domContainer = document.getElementById('react_root')
// postListUrl as it’s a global variable that was defined on the page above where the current script was included.
ReactDOM.render(
  React.createElement(PostTable,{url: postListUrl}),// url go to  componentDidMount then fetch
  domContainer
)


// The next features to add would be sorting of results by clicking on the table headers, as well as going through the results page by page. Since we have a paginated response, we’re only actually showing the first 100 posts in the table.

// class ChildButton extends React.Component {
//   render () {
//     return <button onClick={ () => { this.props.parentCallback('foo') } }>Click Me</button>
//   }
// }

// class ParentContainer extends React.Component {
//   aCallback(val) {
//     // will log 'foo' when child is clicked
//     console.log(val)
//   }

//   render () {
//     return <div>
//       <ChildButton parentCallback={ (arg) => { this.aCallback(arg) } } />
//     </div>
//   }
// }