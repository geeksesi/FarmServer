# FarmServer
a server side for a game

## how use :
first do packages : `yarn` \
for test : `yarn test` ( will execute colyseus with debug) \
for run : `yarn start` ( will execute colyseus with debug) \
run loadtest (not scripted) : `yarn loadtest`


join on room : `farm`

in init you will recive : array of build 
```
    this.send(client, {
        ok: true,
        message_type: "init",
        data: [
            {
                _id : ,
                type : ,
                location : 
            }
        ]
    })
```
`_id` is auto generated mongoose id \
`type` is build type \
`location` is a string of where is this build like 12-2 (x-y)


Ok you are in game..

now can send message - type of message :

- add_build : 
  ```
    {
        message_type : `add_build`,
        type : (build type),
        locantio : (X-Y)
    }
  ```

- update_build : can change type or location or both ( if dont' want change on of them replace old value don't send empty)
  ```
    {
        message_type : `update_build`,
        id : (build_id),
        new_type : (build type),
        new_locantio : (X-Y)
    }
  ```

- delete_build : 
  ```
    {
        message_type : `update_build`,
        id : (build_id),
    }
  ```

 more info  : `src/rooms/farm.js`