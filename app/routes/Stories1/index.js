import React, {Component} from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  ShareDialog,
  AccessToken
} = FBSDK;





  render () {
    return (
      <View style={[styles.container, this.border('blue')]}>


      <View style={[styles.stories, this.border('yellow')]}>

      </View>



        <View style={[styles.exit, this.border('pink')]}>
          <LoginButton
            onLogoutFinished={() => alert("logout.")}/>
        </View>
      </View>
    );
  }
  border(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
  };
}




class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.bindMethods();
    }

    bindMethods() {
        if (! this.bindableMethods) {
            return;
        }

        for (var methodName in this.bindableMethods) {
            this[methodName] = this.bindableMethods[methodName].bind(this);
        }
    }

    getInitialState() {
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        }

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        }

        return {
            loaded : false,
            dataSource : new ListView.DataSource({
                getSectionData          : getSectionData,
                getRowData              : getRowData,
                rowHasChanged           : (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged : (s1, s2) => s1 !== s2
            })
        }
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData () {
        fetch(API_URL).then((response) => response.json()).then((responseData) => {



            var responseData = {
              "results" : [
                {
                  "eventDetail":"Date",   //       "organization":"Broadcast Instructional Mechanical",
          	      "id" : 12348124,
                  "outfits" : [
                      {"outfit":{"gender":"female","name":{"title":"miss","first":"marga","last":"seegers"},
                        "picture":{"large":"http://api.randomuser.me/portraits/women/35.jpg","medium":"http://api.randomuser.me/portraits/med/women/35.jpg",
                        "thumbnail":"http://api.randomuser.me/portraits/thumb/women/35.jpg"},"version":"0.6","nationality":"NL"},"seed":"0e4de8b1953a999b06"},
                      {"outfit":{"gender":"female","name":{"title":"ms","first":"kristianne","last":"van den oetelaar"},
                        "picture":{"large":"http://api.randomuser.me/portraits/women/21.jpg",
                        "medium":"http://api.randomuser.me/portraits/med/women/21.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/21.jpg"},
                        "version":"0.6","nationality":"NL"}},
                      {"outfit":{"gender":"female","name":{"title":"ms","first":"livia","last":"stout"},
                      "picture":{"large":"http://api.randomuser.me/portraits/women/68.jpg",
                        "medium":"http://api.randomuser.me/portraits/med/women/68.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/68.jpg"},
                        "version":"0.6","nationality":"NL"}}
                      ]
                },
                {
                  "eventDetail":"Date",   //       "organization":"Broadcast Instructional Mechanical",
                  "id" : 12348124,
                  "outfits" : [
                      {"outfit":{"gender":"female","name":{"title":"miss","first":"marga","last":"seegers"},
                        "picture":{"large":"http://api.randomuser.me/portraits/women/35.jpg","medium":"http://api.randomuser.me/portraits/med/women/35.jpg",
                        "thumbnail":"http://api.randomuser.me/portraits/thumb/women/35.jpg"},"version":"0.6","nationality":"NL"},"seed":"0e4de8b1953a999b06"},
                      {"outfit":{"gender":"female","name":{"title":"ms","first":"kristianne","last":"van den oetelaar"},
                        "picture":{"large":"http://api.randomuser.me/portraits/women/21.jpg",
                        "medium":"http://api.randomuser.me/portraits/med/women/21.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/21.jpg"},
                        "version":"0.6","nationality":"NL"}},
                      {"outfit":{"gender":"female","name":{"title":"ms","first":"livia","last":"stout"},
                      "picture":{"large":"http://api.randomuser.me/portraits/women/68.jpg",
                        "medium":"http://api.randomuser.me/portraits/med/women/68.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/68.jpg"},
                        "version":"0.6","nationality":"NL"}}
                      ]
                }

              ]}



              var stories = responseData.results,  // organizations = responseDate.results
                     length = stories.length,    //  length = organizations.length,
                   dataBlob = {},
                 sectionIDs = [],
                     rowIDs = [],
                      story,                      // organization
                      outfits,                    // users
                      outfitLength,               // user.length
                      outfit,                     //outfit
                      i,
                      j;


            // console.log(outfits.length)
            // length = (outfits.length )
            // var i = 0;
            for (i = 0; i < length; i++) {
            story = stories[i];

            // Add Section to Section ID Array
            sectionIDs.push(story.id);
            // Set Value for Section ID that will be retrieved by getSectionData
            dataBlob[story.id] = story.eventDetail;

            outfits = story.outfits;
            outfitLength = outfits.length;

            // Initialize Empty RowID Array for Section Index
            rowIDs[i] = [];

            for(j = 0; j < outfitLength; j++) {
                outfit = outfits[j].outfit;
                // Add Unique Row ID to RowID Array for Section
                rowIDs[i].push(outfit.photo_url);

                // Set Value for unique Section+Row Identifier that will be retrieved by getRowData
                dataBlob[story.id + ':' + outfit.photo_url] = outfit;
            }
        }


            this.setState({
                dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                loaded     : true
            });

        }).done();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return this.renderListView();
    }

    renderLoadingView() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>What to Wear?</Text>
                <View style={styles.container}>
                    <ActivityIndicatorIOS
                        animating={!this.state.loaded}
                        style={[styles.activityIndicator, {height: 80}]}
                        size="large"
                    />
                </View>
            </View>
        );
    }

    renderListView() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>PiciT</Text>
                </View>
                <ListView
                    dataSource = {this.state.dataSource}
                    style      = {styles.listview}
                    renderRow  = {this.renderRow}
                    renderSectionHeader = {this.renderSectionHeader}
                />
            </View>
        );
    }

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text style={styles.text}>{sectionData}</Text>
            </View>
        );
    }
};

Object.assign(UserList.prototype, {
    bindableMethods : {
        renderRow : function (rowData, sectionID, rowID) {
            return (
                <TouchableOpacity onPress={() => this.onPressRow(rowData, sectionID)}>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowText}>{rowData.picture.large} {rowData.name.first} {rowData.name.last}</Text>
                    </View>
                </TouchableOpacity>
            );
        },
        onPressRow : function (rowData, sectionID) {
            var buttons = [
                {
                    text : 'Cancel'
                },
                {
                    text    : 'OK',
                    onPress : () => this.createCalendarEvent(rowData, sectionID)
                }
            ]
            AlertIOS.alert('User\'s Email is ' + rowData.photo_url, null, null);
        }

    }
});


var styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA',
  },
  stories: {
    marginTop: 60,
    flex: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#AAA',
  },
  exit: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA',
  },
  activityIndicator: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  header: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3F51B5',
      flexDirection: 'column',
      paddingTop: 25
  },
  headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'
  },
  text: {
      color: 'white',
      paddingHorizontal: 8,
      fontSize: 16
  },
  rowStyle: {
      paddingVertical: 20,
      paddingLeft: 16,
      borderTopColor: 'white',
      borderLeftColor: 'white',
      borderRightColor: 'white',
      borderBottomColor: '#E0E0E0',
      borderWidth: 1
  },
  rowText: {
      color: '#212121',
      fontSize: 16
  },
  subText: {
      fontSize: 14,
      color: '#757575'
  },
  section: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 6,
      backgroundColor: '#2196F3'
  }
});
