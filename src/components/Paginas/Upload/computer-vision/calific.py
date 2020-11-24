from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
from tensorflow.keras.optimizers import RMSprop
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
import cv2
import os

# img = image.load_img("C:/Users/ezequielgamer/Desktop/KUARENTENA/PROYECTO INTEGRADOR/API/computer-vision/basedata/training/bueno/0c37fab39da6ded220c3f9ccac8d117c.jpg")

# plt.imshow(img) ---  comando que muestra la imagen
# cv2.imread("C:/Users/ezequielgamer/Desktop/computer-vision/basedata/training/bueno/0c37fab39da6ded220c3f9ccac8d117c.jpg").shape -- puedes ver las dimansiones de la imagen

train = ImageDataGenerator(rescale= 1/255)
validation = ImageDataGenerator(rescale= 1/255)

train_dataset = train.flow_from_directory('C:/Users/lucho/Desktop/computer-vision/basedata/training/', #cambiar
target_size= (200,200),
batch_size= 3,
class_mode= 'categorical')

validation_dataset = train.flow_from_directory('C:/Users/lucho/Desktop/computer-vision/basedata/validation/', #cambiar
target_size= (200,200),
batch_size= 3,
class_mode= 'categorical')


print(train_dataset.class_indices) # Indica que numero le fue asignado a cada clase 
print(train_dataset.classes) # Indicaria el valor de cada una de las imagenes

model = tf.keras.models.Sequential([ tf.keras.layers.Conv2D(16,(3,3),activation= 'relu', input_shape=(200,200,3)),
                                    tf.keras.layers.MaxPool2D(2,2),
                                    #
                                    tf.keras.layers.Conv2D(32,(3,3),activation= 'relu'),
                                    tf.keras.layers.MaxPool2D(2,2),
                                    #
                                    tf.keras.layers.Conv2D(64,(3,3),activation= 'relu'),
                                    tf.keras.layers.MaxPool2D(2,2),
                                    ##
                                    tf.keras.layers.Flatten(),
                                    ##
                                    tf.keras.layers.Dense(512,activation= 'relu'),
                                    ##
                                    tf.keras.layers.Dense(10 ,activation= 'softmax') #Para mas de 2 categorias poner "softmax" 
])

model.compile(loss= 'categorical_crossentropy',
            optimizer= RMSprop(lr= 0.001),
            metrics=['categorical_accuracy'])  #Datos que se van a visualizar la carga de datos

model.fit = model.fit(train_dataset,
                    steps_per_epoch = 3,
                    epochs= 30,
                    validation_data= validation_dataset) # entrenamiento


dir_path = 'C:/Users/lucho/Desktop/computer-vision/basedata/testing' # Se cargan las imagenes de test para ver como clasifica.  cambiar

for i in os.listdir(dir_path): 
    img = image.load_img(dir_path+'//'+ i,target_size=(200,200))
    plt.imshow(img)
    plt.show()

    X = image.img_to_array(img)
    X = np.expand_dims(X,axis =0)
    images = np.vstack([X])

    val = model.predict(images)
    arreglo = val
    print(val)

    for j in arreglo:
        m=max(j)
        p=0
        for k in j:
            p+=1
            if k == m:
                break
        print(p)

