from utility.singleton import Singleton
from configuration.configs import Configs
from connector.mongo_helper import MongoHelper

class ConstructGraphControler(metaclass=Singleton):
    debug: bool
    mongo_helper: MongoHelper

    def __init__(self):
        self.debug = False
        self.mongo_helper = MongoHelper(Configs.mongo_url, debug=self.debug)

    def edgeHandler():
        pass

    def nodeHandler(self):
        data = {
            next_page_token: "test",
            running_status: True
        }
        self.mongo_helper.insert_one(status, data)