from typing import List
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    id: int
    name: str
    age: str
    gender: str
    country: str


# In-memory data store for users
users = [
    User(id=1, name="John Doe", age="30", gender="male", country="USA"),
    User(id=2, name="Jane Smith", age="23", gender="male", country="Canada"),
    User(id=3, name="Bob Johnson", age="3", gender="male", country="UK"),
]
next_id = 4


@app.get("/api/users", response_model=List[User])
def get_users():
    return users


@app.post("/api/users", response_model=User, status_code=201)
def create_user(user: User = Body(...)):
    global next_id
    user.id = next_id
    users.append(user)
    next_id += 1
    return user


@app.get("/api/users/{user_id}", response_model=User)
def get_user(user_id: int):
    for user in users:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")


@app.put("/api/users/{user_id}", response_model=User)
def update_user(user_id: int, user: User):
    for i, u in enumerate(users):
        if u.id == user_id:
            users[i] = user
            return user
    raise HTTPException(status_code=404, detail="User not found")


@app.delete("/api/users/{user_id}", response_model=User)
def delete_user(user_id: int):
    for i, user in enumerate(users):
        if user.id == user_id:
            deleted_user = users.pop(i)
            return deleted_user
    raise HTTPException(status_code=404, detail="User not found")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=5000)
