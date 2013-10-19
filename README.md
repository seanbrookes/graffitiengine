Graffiti Engine
===========

Graffiti Engine implementation


- a jump off point
- demonstrate the following
-- mongo db
-- Nodejs based rest web service
-- backbonejs (marionettejs) based front end
-- requires AMD dependency managment on the client
-- simple account / authentication implementation
-- modular JavaScript
-- event driven architecture



- it is an exploration of scalable, flexible full stack JavaScript application architecture.

## Getting started
1) Install Mongodb
2) fork this repo
3) navigate to the sf1 directory
4) optional - edit the package.json/app-config files to change ports, app names, etc.
5) npm install

If everything goes according to plan you shold be able to bring up the app.


## Features
- a slightly opinionated development model
- modular event driven JavaScript front end
- basic Nodejs/mongo backend
- simple account creation and authentication
- Grunt enabled
- Less / Bootstrap enabled


## Stack:
- mongo
- node
-- mongoose
-- express
- backbone
- marionette
- requirejs
- less CSS
- bootstrap (3)

## Features:
- turn-key modular js application engine - require / marionette  oriented
- account creation and authentication
- index/home/admin/application/security module stubs OOTB to get started
- Less CSS preprosessor available
- Kube CSS enabled (lightweight alternative to Bootstrap) - http://imperavi.com/kube/

## Backlog:
- unit tests

## Known Issues / Todo
- You have to have mondodb installed
- Currently the Winston logging module expects a 'logs' folder in the root of the project.  I haven't had time to set this configuration to turn off the dependency in a production deployment.
I'm sure it is straight forward but my work around to this point is simply include the folder in my deployments.
- change from cookie session to OAuth
- implement autosave

## road map
- archive/export
- dynamic page targeting
- dynamic host targeting
- RSS feed

License: MIT
Attribution: Sean Brookes


# todo
- markdown editor support
- [done] autosave on timer /  with checkbox to turn the autosave on and off
- [done] user preference for how often to autosave
- post page to edit url on create
- offline synchronization
- slug designation at publish time
- RSS feed
- export/backup