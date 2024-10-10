
# Quick start

This is my personal testing and practices field for the module **50 JS Database**.

---

### Step 1: Starting Docker Postgres server 

Inside postgress folder you will find a file called `postgres.yml`

Just open a terminal go to main folder and exec `initDocker.bat` or this command: 
```
docker-compose -f postgres.yml up
```
For more info visit: https://github.com/docker-library/docs/blob/master/postgres/README.md

I have modified the compose file to expose the port 5432 of the postgres server container. 

---

### Step 2: How to launch the app

You only have to open a new terminal and exec: 
```
    npm start
```

Then the app creates some mock data and query it. 

---

### Usefull links: 

Node-Postgres: https://node-postgres.com/

npm repository: https://www.npmjs.com/package/pg?activeTab=readme


---

### Version info & disclaimer

Last update: 2024/10/08 - ZmG
