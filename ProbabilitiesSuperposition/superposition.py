import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from scipy.stats import norm, expon, gamma

# Definir distribuciones conocidas
x = np.linspace(0, 15, 500)  # Eje x (valores para calcular las PDFs)
distribuciones = [
    ("Estado 1", norm.pdf(x, loc=8, scale=2)),         # Distribución Normal (media=8, desv. std.=2)
    ("Estado 2", expon.pdf(x, scale=2)),         # Distribución Exponencial (lambda=1/2)
    ("Estado 3", gamma.pdf(x, a=2, scale=2)),          # Distribución Gamma (k=2, theta=2)
]

# Configurar la figura
fig, ax = plt.subplots()
ax.set_xlim(0, 15)
ax.set_ylim(0, 0.5)
ax.set_xlabel('t')
ax.set_ylabel('Densidad de Probabilidad')
ax.set_title('Animación de Densidades de Probabilidad')
lines = [ax.plot([], [], label=label)[0] for label, _ in distribuciones]

# Inicialización de líneas vacías
def init():
    for line in lines:
        line.set_data([], [])
    return lines

# Función de animación
def update(frame):
    for i, (label, pdf) in enumerate(distribuciones):
        lines[i].set_data(x[:frame], pdf[:frame])  # Actualizar datos hasta el frame actual
    return lines

# Crear la animación
anim = FuncAnimation(
    fig, update, frames=len(x), init_func=init, blit=True, interval=30
)

# Agregar leyenda
ax.legend()

# Mostrar la animación
plt.show()
