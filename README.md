# TreeWonderServer

TreeWonder android application API

Frontend : https://github.com/Ramamas6/TreeWonder

Link : https://treewonder.cleverapps.io

## GET methods

- Get all the trees:
    https://treewonder.cleverapps.io/trees
- Get one tree with his id (:id):
    https://treewonder.cleverapps.io/trees/:id
- Get all the trees matching the term (:term) in on of their parameters:
    https://treewonder.cleverapps.io/trees/search/:term

## POST methods

- Insert a new tree:
    https://treewonder.cleverapps.io/trees
    body: Tree (with at least the name property)

## DELETE methods

  ⚠️ `Don't do anything foolish!`

- Delete a tree with his id (:id):
    https://treewonder.cleverapps.io/trees/:id
- Delete all the trees comming from the original API:
    https://treewonder.cleverapps.io/trees/api
- Delete all the trees added manually (not comming from the original API):
    https://treewonder.cleverapps.io/trees/manual
- Delete all the trees:
    https://treewonder.cleverapps.io/trees

## License

Nest is [MIT licensed](LICENSE).
