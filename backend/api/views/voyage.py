from api import app,mysql
from api.models import *
from flask import jsonify,request
import json
import pathlib

@app.route("/voyages/<idUser>", methods=["GET"])
def Voyages(idUser):  
    voyages = Voyage.getAllVoyages(idUser)
    return jsonify(voyages)

@app.route("/voyage/<idVoyage>", methods=["GET"])
def getVoyage(idVoyage):
    voyage = Voyage.getOneVoyage(idVoyage)
    return jsonify(voyage)

@app.route("/voyage/basicInfos",methods=["POST"],strict_slashes=False)
def insertionBasicInfo():
    
    titre = request.form['titre']
    dateDebut = request.form['date_debut']
    dateFin = request.form['date_fin']
    idUser= request.form['idUser']
    continent = request.form['continent']

    id = Voyage.insertBasicInfos(titre,dateDebut,dateFin,idUser,continent)
    return jsonify(id)

@app.route("/voyage", methods=["POST"],strict_slashes=False)
def createVoyage():
    
    id_voyage = request.form['id_voyage']
    numeroEtape = request.form['numeroEtape']
    villeName = request.form["villeName"]
    souv = request.form["souv"]
    file = request.files['fileS']
    upload_rep = Voyage.uploadFile(file)
    insertEtapesVoyageRep = Voyage.insertEtapesVoyage(id_voyage,villeName,souv,file.filename,numeroEtape)
    
    return jsonify(souv)