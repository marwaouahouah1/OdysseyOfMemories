from api import app,mysql
import json
from pathlib import Path
from werkzeug.utils import secure_filename
import os

class Voyage():
    def __init__():
        return 
    
    @staticmethod
    def getAllVoyages(idUser):
        cur = mysql.connection.cursor()
        cur.execute("SELECT id_voyage,titre,continent FROM voyages WHERE id_user="+str(idUser))
        fetchdata = cur.fetchall() 
        cur.close()

        return fetchdata
    
    @staticmethod
    def getOneVoyage(idVoyage):
        cur = mysql.connection.cursor()
        cur.execute("SELECT id_etape_voyage,nom_ville,description_souvenir,file_souvenir, numero_etape FROM etapes_voyage WHERE id_voyage="+str(idVoyage) +" ORDER BY numero_etape")
        fetchdata = cur.fetchall()
        cur.close()

        return fetchdata
    
    @staticmethod
    def insertBasicInfos(titre,dateDebut,dateFin,idUser,continent):
        print(dateDebut)
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO voyages(continent,titre,date_debut,date_fin,id_user) VALUES('"+str(continent)+"','"+str(titre)+"','"+str(dateDebut)+"','"+str(dateFin)+"','"+str(idUser)+"')")
        cur.connection.commit()
        id= cur.lastrowid
        cur.close()
        
        return id
    
    @staticmethod
    def uploadFile(file):
        ROOT_DIR = Path(__file__).parent.parent.parent.parent
        UPLOAD_FOLDER = str(ROOT_DIR)+"/frontend/public/souvenirs_files"
        app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
        
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return "ok"
    
    @staticmethod
    def deleteUploadedFile(id_etape_voyage):
        cur = mysql.connection.cursor()
        cur.execute("SELECT file_souvenir FROM etapes_voyage WHERE id_etape_voyage="+str(id_etape_voyage)+";")
        fetchdata = cur.fetchall()
        cur.close()

        ROOT_DIR = Path(__file__).parent.parent.parent.parent
        UPLOAD_FOLDER = str(ROOT_DIR)+"/frontend/public/souvenirs_files"
        app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
        filename= fetchdata[0]["file_souvenir"]
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'],filename ))

        return 'ok'
        

        

    
    @staticmethod
    def insertEtapesVoyage(id_voyage, nom_ville,description_souvenir,file_souvenir,numero_etape):
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO etapes_voyage(id_voyage, nom_ville,description_souvenir,file_souvenir,numero_etape) VALUES('"+str(id_voyage)+"','"+str(nom_ville)+"','"+str(description_souvenir)+"','"+str(file_souvenir)+"','"+str(numero_etape)+"')")
        cur.connection.commit()
        cur.close()
        return 1
         
    @staticmethod
    def deleteVoyage(id_voyage):
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM voyages WHERE id_voyage="+str(id_voyage))
        cur.connection.commit()
        cur.close()
        return 1
    
    @staticmethod
    def modifyStepVoyage(idEtapeVoyage,souvenirDescription, souvenirFile):
        cur = mysql.connection.cursor()
        cur.execute("UPDATE etapes_voyage SET description_souvenir = '"+str(souvenirDescription)+"', file_souvenir = '"+ str(souvenirFile) +"' WHERE id_etape_voyage="+str(idEtapeVoyage)+";")
        cur.connection.commit()
        cur.close()
        return 1