import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation


# HMM parameters
states = ['Soleado', 'Nublado', 'Lluvioso']
observations = ['Alta presión', 'Baja presión']
pi = np.array([0.5, 0.3, 0.2])  # Initial probabilities
A = np.array([[0.7, 0.2, 0.1],  # Transition matrix
              [0.3, 0.4, 0.3],
              [0.2, 0.3, 0.5]])
B = np.array([[0.8, 0.2],  # Emission matrix
              [0.4, 0.6],
              [0.2, 0.8]])

# Generate a long observed sequence
obs_seq = np.random.choice([0, 1], size=1000, p=[0.6, 0.4])  # 1000 observations

def forward_algorithm_stepwise(pi, A, B, obs_seq):
    T = len(obs_seq)
    N = len(states)
    alpha = np.zeros((T, N))
    steps = []

    # Initial step
    alpha[0] = pi * B[:, obs_seq[0]]
    alpha[0] /= np.sum(alpha[0])  # Normalize
    steps.append(alpha[:1].copy())  # Ensure 2D array for animation

    # Recursion with normalization
    for t in range(1, T):
        for j in range(N):
            alpha[t, j] = np.sum(alpha[t-1] * A[:, j]) * B[j, obs_seq[t]]
        alpha[t] /= np.sum(alpha[t])  # Normalize
        steps.append(alpha[:t+1].copy())  # Collect as 2D slice

    return steps

# Run forward algorithm stepwise
steps = forward_algorithm_stepwise(pi, A, B, obs_seq)

# Animation setup
fig, ax = plt.subplots()
lines = [ax.plot([], [], label=state)[0] for state in states]
ax.set_xlim(0, 50)
ax.set_ylim(0, 1)
ax.set_title('Forward Algorithm - Step by Step')
ax.set_xlabel('Time Step')
ax.set_ylabel('Probability')
ax.legend()

def update(frame):
    current_data = steps[frame]
    for line, state_probs in zip(lines, current_data.T):
        line.set_data(range(max(len(state_probs) - 50, 0),len(state_probs)), state_probs[max(len(state_probs) - 50, 0):len(state_probs)])
        ax.set_xlim(max(len(state_probs) - 50, 0),len(state_probs))
    ax.set_title(f'Forward Algorithm - Time Step {frame + 1}')
    return lines

ani = FuncAnimation(fig, update, frames=len(steps), interval=200, repeat=True)
plt.show()
