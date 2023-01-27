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
        #TODO we need to go through all transactions and extract all EOA and CA addresses as main nodes
        
        test = self.mongo_helper.get_all('status')
        print(test)
